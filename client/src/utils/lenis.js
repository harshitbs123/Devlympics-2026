import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerHandler = null;
let clickHandler = null;

/**
 * Initializes global Lenis smooth scrolling synchronized with GSAP ScrollTrigger.
 * Uses a single instance pattern to prevent duplicate animation loops.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // Respect reduced motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  // If already initialized, return existing instance
  if (lenisInstance) {
    return lenisInstance;
  }

  // 1. Initialize Lenis with refined momentum and natural responsiveness
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Natural exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.25,
    infinite: false,
  });

  lenisInstance = lenis;
  window.__lenis = lenis;

  // 2. Synchronize Lenis scroll event with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // 3. Connect Lenis frame updates to GSAP's high-precision ticker
  tickerHandler = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerHandler);

  // Disable GSAP lag smoothing to avoid jumps during rapid or burst scrolling
  gsap.ticker.lagSmoothing(0);

  // 4. Handle smooth anchor links across the website (e.g. href="#how-it-works")
  clickHandler = (e) => {
    const targetAnchor = e.target.closest('a[href^="#"]');
    if (!targetAnchor) return;

    const href = targetAnchor.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;

    const targetElem = document.querySelector(href);
    if (targetElem) {
      e.preventDefault();
      lenis.scrollTo(targetElem, {
        offset: -40,
        duration: 1.2,
      });
    }
  };
  document.addEventListener('click', clickHandler);

  // 5. Ensure ScrollTrigger recalculates after web fonts finish loading
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  return lenis;
}

/**
 * Returns the active global Lenis instance.
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Programmatically scrolls to a target with Lenis (or falls back to native scroll).
 */
export function scrollToTarget(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/**
 * Clean up global Lenis instance and detached event listeners.
 */
export function destroySmoothScroll() {
  if (tickerHandler) {
    gsap.ticker.remove(tickerHandler);
    tickerHandler = null;
  }

  if (clickHandler) {
    document.removeEventListener('click', clickHandler);
    clickHandler = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
    window.__lenis = null;
  }
}
