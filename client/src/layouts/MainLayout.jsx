import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { initSmoothScroll, destroySmoothScroll, getLenis } from '../utils/lenis';

const MainLayout = () => {
  const { pathname, hash } = useLocation();

  // Initialize global Lenis smooth scroll singleton on application mount
  useEffect(() => {
    initSmoothScroll();

    return () => {
      destroySmoothScroll();
    };
  }, []);

  // When changing routes or hashes, handle scroll position
  useEffect(() => {
    const lenis = getLenis();
    if (hash) {
      const timer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -70 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }

    // Refresh ScrollTrigger calculations after route transition
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F4] text-[#121316] overflow-x-clip">
      {/* 1. Seamless Golden Amber Arch (extending from the very top of the window) */}
      <div className="hero-ambient-arch pointer-events-none fixed inset-x-0 top-0 h-[560px] w-full z-0" />

      {/* 2. Unified Background Perspective Grid */}
      <div className="hero-grid-bg pointer-events-none fixed inset-0 opacity-70 z-0" />

      {/* 3. Sun-dappled Leaf Shadow Simulation */}
      <div className="sun-dappled-overlay pointer-events-none fixed inset-0 z-0" />

      {/* 4. Floating Navbar Header (Seamlessly overlaying the unified background) */}
      <div className="relative z-50 w-full pt-4 sm:pt-5 pb-2">
        <Navbar />
      </div>

      {/* 5. Main Route Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* 6. Minimal, Vibrant TalkBridge Footer */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
