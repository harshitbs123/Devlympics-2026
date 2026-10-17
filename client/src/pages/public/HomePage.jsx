import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/auth/AuthContext';
import { MascotCardTrio } from '../../components/MascotCards';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const HomePage = () => {
  const { isLoggedin, user } = useAuth();

  return (
    <div className="relative overflow-hidden text-[#121316]">
      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-4 pb-16 sm:px-6 sm:pt-6 text-center">
        
        {/* Animated Left Sparkle Doodle */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute left-6 top-16 hidden text-[#121316]/80 sm:block select-none"
        >
          <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L22 16L34 18L22 20L20 32L18 20L6 18L18 16Z" fill="#FFE600" stroke="#121316" strokeWidth="2" />
            <path d="M30 6L31 10L35 11L31 12L30 16L29 12L25 11L29 10Z" fill="#FF7AA2" stroke="#121316" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Animated Right Curly Squiggle Doodle */}
        <motion.div
          animate={{
            y: [0, 7, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
          className="pointer-events-none absolute right-8 top-16 hidden text-[#121316] sm:block select-none"
        >
          <svg className="h-12 w-12" viewBox="0 0 50 50" fill="none">
            <path
              d="M10 20C12 12 24 10 24 18C24 26 12 28 14 38C16 46 28 44 34 36C40 28 42 16 46 22"
              stroke="#121316"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Top Section: Sun Rays & Social Proof Pill (whileInView entry) */}
        <motion.div
          initial={{ opacity: 0, y: -18, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: PREMIUM_EASE }}
          className="mb-3 inline-flex flex-col items-center"
        >
          {/* Hand-drawn rays \ | / */}
          <div className="mb-1 text-[#121316]">
            <svg className="h-4 w-12" viewBox="0 0 48 16" fill="none">
              <path d="M12 14L4 4" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M24 14L24 2" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M36 14L44 4" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Social Proof Pill with Hover Micro-interaction */}
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="inline-flex cursor-default items-center gap-2.5 rounded-full border border-stone-200/90 bg-white/95 px-3.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] backdrop-blur-sm"
          >
            {/* Overlapping Gesture Avatars */}
            <div className="flex -space-x-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#38BDF8] text-[9px] font-bold text-white">
                👋
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#FF7AA2] text-[9px] font-bold text-white">
                ✌️
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#FFE600] text-[9px] font-bold text-[#121316]">
                🤟
              </span>
            </div>
            <span className="text-xs font-semibold text-stone-700">
              Connecting <strong>10,000+</strong> conversations across barriers
            </span>
          </motion.div>
        </motion.div>

        {/* Tilted Sticker Badge (whileInView + whileHover spring) */}
        <div className="mb-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="inline-flex cursor-pointer select-none items-center gap-1.5 rounded-xl border-2 border-[#121316] bg-[#FFE600] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#121316] shadow-[2px_3px_0_#121316]"
          >
            <span>⚡ Devlympics 2026</span>
            <span className="opacity-40">•</span>
            <span>Problem Statement #3: Bridge the Gap</span>
          </motion.div>
        </div>

        {/* Hero Main Heading (Cinematic whileInView Entrance) */}
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE, delay: 0.1 }}
          className="font-display mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl text-[#121316] leading-[1.08]"
        >
          Connect two worlds with{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10 text-[#121316]">voice & vision</span>
            {/* Animated Yellow Marker Highlight */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.5, ease: PREMIUM_EASE }}
              className="absolute -bottom-1 left-0 -z-0 h-4 w-full origin-left rounded-md bg-[#FFE600]/80"
              style={{ transform: 'rotate(-0.5deg)' }}
            />
          </span>
        </motion.h1>

        {/* Subtitle (whileInView Entrance) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: PREMIUM_EASE, delay: 0.22 }}
          className="font-sans mx-auto mt-4 max-w-xl text-base text-stone-600 sm:text-lg leading-relaxed"
        >
          An intuitive dual-way assistant translating sign language, facial cues, and spoken dialogue in real time — so no voice is ever left behind.
        </motion.p>

        {/* CTA Buttons (whileInView + whileHover & whileTap Springs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.32 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3.5"
        >
          {isLoggedin ? (
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 rounded-full border-2 border-[#121316] bg-white px-5 py-2.5 shadow-[3px_3px_0_#121316]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-[#121316]">
                Signed in as <span className="underline decoration-[#FFE600] decoration-2">{user?.name}</span> • Bridge Active
              </span>
            </motion.div>
          ) : (
            <>
              {/* Primary: Solid Black Pill with Spring Hover & Tap */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: '4px 6px 0px #FFE600',
                }}
                whileTap={{
                  scale: 0.96,
                  y: 1,
                  boxShadow: '1px 2px 0px #FFE600',
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
              >
                <Link
                  to="/signup"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-[#121316] bg-[#121316] px-6 py-3 text-sm font-bold text-white shadow-[3px_4px_0_#FFE600]"
                >
                  <span>Launch Live Bridge</span>
                  <span className="text-[#FFE600] transition-transform duration-200 group-hover:scale-125">⚡</span>
                </Link>
              </motion.div>

              {/* Secondary: White Pill with Smooth Lift */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              >
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-800 shadow-sm transition hover:border-black hover:bg-stone-50"
                >
                  <span>How It Works</span>
                  <span className="text-stone-400">↗</span>
                </a>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Mascot Card Trio with Staggered Entrance & Hover Lift */}
        <div id="how-it-works" className="mt-8">
          <MascotCardTrio />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
