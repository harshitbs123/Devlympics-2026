# 🎬 Master Web Animation Guide: View, ScrollTrigger, Hover & Beyond

This guide compiles production-ready animation techniques extracted from the reference architecture (`sample/`), paired with industry best practices across **Motion (Framer Motion v12+)**, **GSAP & ScrollTrigger**, **Lenis Smooth Scroll**, and **Native CSS Scroll-Driven Animations**.

---

## 📑 Table of Contents
1. [The Web Animation Architecture (When to Use What)](#1-the-web-animation-architecture)
2. [View / Entrance Animations (`whileInView`, `useInView`, Stagger)](#2-view--entrance-animations)
3. [Scroll-Triggered Animations (GSAP + ScrollTrigger)](#3-scroll-triggered-animations-gsap--scrolltrigger)
4. [Lenis Smooth Inertia Scroll Synchronization](#4-lenis-smooth-inertia-scroll-synchronization)
5. [Interactive Hover & Gesture Animations](#5-interactive-hover--gesture-animations)
6. [Native CSS Scroll-Driven Animations (Zero-JS)](#6-native-css-scroll-driven-animations-zero-js)
7. [Quick Copy-Paste Animation Recipes](#7-quick-copy-paste-animation-recipes)

---

## 1. The Web Animation Architecture

Before adding animations, choose the right tool for the job based on the **Performance Pyramid**:

| Animation Type | Recommended Engine | Primary Benefit | Example Use Case |
| :--- | :--- | :--- | :--- |
| **Component Entry & State Transitions** | **Motion (`motion/react`)** | Declarative, reactive, spring physics, zero layout shifts | Hero elements fading in on view, modal open/close, card mounts |
| **Micro-Interactions (Hover/Tap)** | **Motion or Tailwind CSS** | Instant tactile response (springs) | Button scale on hover, icon wiggles, card lifts |
| **Complex Scroll Timelines & Pinning** | **GSAP + ScrollTrigger** | Pinning containers, multi-stage sequential scrubbing, horizontal tracks | Feature scroll sections, 3D model camera scrub, pinned split-screens |
| **Inertia Page Glide** | **Lenis** | Eliminates scroll jitter, syncs requestAnimationFrame | Whole page smooth luxury scroll |
| **Simple Reading Progress / Parallax** | **CSS `@supports (animation-timeline: scroll())`** | Runs on the Compositor thread (120 FPS, 0 JS cost) | Reading progress bar, background parallax |

---

## 2. View / Entrance Animations

### 2.1 Declarative `whileInView` with Spring Easing
Instead of manually listening to scroll events, modern Motion components trigger as soon as the element enters the viewport.

```jsx
import { motion } from 'motion/react';

// Luxury cubic-bezier easing curve from sample
const PREMIUM_EASE = [0.16, 1, 0.3, 1];

export const FadeUpCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.85, ease: PREMIUM_EASE }}
  >
    {children}
  </motion.div>
);
```

#### Key `viewport` Options:
- `once: true`: Animates only the first time it scrolls into view (recommended for hero and content cards).
- `amount: 0.3`: Triggers when 30% of the element is visible.
- `margin: "-100px"`: Offsets the detection threshold (useful to trigger before the user reaches it).

---

### 2.2 Staggered Children Container Pattern
When rendering a list of items (e.g. features, navbar links, mascot cards), stagger their entry automatically.

```jsx
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // 120ms gap between each child
      delayChildren: 0.1,    // delay before first child starts
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const StaggeredList = ({ items }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    {items.map((item, index) => (
      <motion.div key={index} variants={itemVariants} className="card">
        {item.title}
      </motion.div>
    ))}
  </motion.div>
);
```

---

### 2.3 Split-Text Character-by-Character Reveal (Hero Technique from `sample`)
Creates a cinematic typewriter/kinetic wave entrance where each letter enters with a staggered blur and position shift.

```jsx
import { motion } from 'motion/react';

const CHAR_REVEAL = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const KineticHeading = ({ text, baseDelay = 0.1, stagger = 0.03 }) => {
  return (
    <h1 className="text-5xl font-black">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={baseDelay + i * stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={CHAR_REVEAL}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};
```

---

## 3. Scroll-Triggered Animations (GSAP + ScrollTrigger)

When an animation must **bind directly to scrollbar movement** (scrubbing), **pin a container in place**, or **animate complex SVG paths**, use **GSAP + ScrollTrigger**.

### 3.1 React Integration with `gsap.context()`
Always wrap GSAP calls in `gsap.context()` inside `useEffect` or `useLayoutEffect` to guarantee memory cleanup and prevent React StrictMode duplicates.

```jsx
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PinnedShowcase = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    // 1. Create context scoped to container
    const ctx = gsap.context(() => {
      // Scrub card scale and rotation as user scrolls through the container
      gsap.fromTo(
        cardRef.current,
        { scale: 0.8, rotate: -4, opacity: 0.4 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',     // Start when container top hits 80% viewport
            end: 'top 20%',       // End when container top hits 20% viewport
            scrub: 1,             // 1 second smooth catch-up lag
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    // 2. Revert on unmount (kills all triggers and tweens)
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen py-24 flex items-center justify-center">
      <div ref={cardRef} className="p-12 rounded-3xl bg-white shadow-2xl">
        Scrubbed with Scroll!
      </div>
    </div>
  );
};
```

---

### 3.2 Horizontal Pin & Scroll Track (From `sample/FeaturesScroll.jsx`)
Pins the viewport while translating an inner track horizontally across `X`vw.

```jsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const pinnedSection = pinnedRef.current;
    const track = trackRef.current;
    
    // Total horizontal distance to travel
    const totalTravel = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalTravel,
      ease: 'none',
      scrollTrigger: {
        trigger: pinnedSection,
        start: 'top top',
        end: () => `+=${totalTravel}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, containerRef);

  return () => ctx.revert();
}, []);
```

---

## 4. Lenis Smooth Inertia Scroll Synchronization

For luxury inertia scrolling that feels fluid without breaking native browser accessibility, use **Lenis** synced to GSAP's internal ticker.

### The Standard `useLenis.js` Hook:
```javascript
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from the GSAP ticker
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Prevent stutter after tab switch

    return () => {
      gsap.ticker.remove(update);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return lenisRef.current;
};
```

---

## 5. Interactive Hover & Gesture Animations

### 5.1 Spring-Based Physical Hover (`whileHover` + `whileTap`)
Unlike CSS `transition: all 0.3s ease`, springs preserve velocity and feel responsive and tactile.

```jsx
import { motion } from 'motion/react';

export const SpringButton = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{
      scale: 1.05,
      y: -3,
      boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
    }}
    whileTap={{
      scale: 0.96,
      y: 0,
      boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
    }}
    transition={{
      type: 'spring',
      stiffness: 450,
      damping: 24,
    }}
    className="rounded-full bg-black text-white px-6 py-3 font-bold"
  >
    {children}
  </motion.button>
);
```

---

### 5.2 Kinetic Letter-Wave Hover Effect (From `sample/LoginPage.jsx`)
Characters in a button or link perform a wave bounce sequentially when hovered.

```css
/* In CSS: */
@keyframes compareLetterWave {
  0% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
  70% { transform: translateY(3px); }
  100% { transform: translateY(0); }
}

.letter-wave-char {
  display: inline-block;
  will-change: transform;
}

.btn-letter-wave:hover .letter-wave-char {
  animation: compareLetterWave 0.85s cubic-bezier(0.37, 0, 0.63, 1) both;
}
```

```jsx
// In JSX:
export const LetterWaveButton = ({ label = 'Get Started' }) => (
  <button className="btn-letter-wave bg-yellow-400 font-bold px-6 py-3 rounded-xl">
    {label.split('').map((char, i) => (
      <span
        key={i}
        className="letter-wave-char"
        style={{ animationDelay: `${i * 60}ms` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </button>
);
```

---

### 5.3 3D Card Perspective Tilt on Cursor Move
Calculates rotation angles relative to the card's bounding box.

```jsx
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export const Card3DTilt = ({ children }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate normalized offset from center (-0.5 to +0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    setRotation({
      rotateX: -normY * 16, // Max 8 degrees tilt
      rotateY: normX * 16,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={rotation}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0_#121316]"
    >
      {children}
    </motion.div>
  );
};
```

---

## 6. Native CSS Scroll-Driven Animations (Zero-JS)

Modern CSS supports hardware-accelerated scroll-timeline animations that execute directly on the browser compositor without sending events to JavaScript.

```css
/* Progress Bar tied to document scroll */
@keyframes growProgressBar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.scroll-progress-bar {
  transform-origin: 0% 50%;
  animation: growProgressBar auto linear;
  animation-timeline: scroll(root);
}

/* Card entry fade-in & scale tied to viewport intersection */
@keyframes cardScrollReveal {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}

.scroll-reveal-card {
  animation: cardScrollReveal linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 40%;
}
```

---

## 7. Quick Copy-Paste Animation Recipes

### Recipe A: Infinite Ambient Float & Wiggle
Ideal for floating stickers, badges, or mascot elements.
```jsx
<motion.div
  animate={{
    y: [0, -10, 0],
    rotate: [-1, 2, -1],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  {/* Sticker / Mascot */}
</motion.div>
```

### Recipe B: Notification / Badge Pop-In
```jsx
<motion.div
  initial={{ scale: 0, opacity: 0, rotate: -8 }}
  whileInView={{ scale: 1, opacity: 1, rotate: -2 }}
  viewport={{ once: true }}
  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
>
  {/* Badge */}
</motion.div>
```

### Recipe C: Neo-Brutalist Button Tap
```jsx
<motion.button
  whileHover={{ scale: 1.03, x: -2, y: -2 }}
  whileTap={{ scale: 0.98, x: 2, y: 2 }}
  className="rounded-xl border-2 border-black bg-[#FFE600] px-6 py-3 font-black shadow-[4px_4px_0_#000] active:shadow-[1px_1px_0_#000]"
>
  Click Me
</motion.button>
```
