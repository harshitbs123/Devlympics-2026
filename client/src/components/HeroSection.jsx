import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/auth/AuthContext';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// Staggered Container Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Smooth Item Entrance Animation
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
  },
};

// ============================================================================
// 1. CUTE MINI HAND-DRAWN DOODLES (Stars, Hearts, Smileys, Soundwaves)
// ============================================================================

/** 4-Point Retro Twinkling Star */
const SparkleDoodle = ({ color = '#FFE600', size = 22, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`${className} select-none drop-shadow-sm`}
  >
    <path
      d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9Z"
      fill={color}
      stroke="#121316"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/** Cute Hand-Drawn Mini Heart */
const MiniHeartDoodle = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size * 0.9}
    viewBox="0 0 24 22"
    fill="none"
    className={`${className} select-none drop-shadow-sm`}
  >
    <path
      d="M12 20C12 20 2 13.5 2 7.5C2 4.5 4.5 2 7.5 2C9.5 2 11 3 12 4.5C13 3 14.5 2 16.5 2C19.5 2 22 4.5 22 7.5C22 13.5 12 20 12 20Z"
      fill="#FF7AA2"
      stroke="#121316"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/** Tiny Smiley Chat Bubble Doodle */
const MiniSmileBubbleDoodle = ({ className = '' }) => (
  <svg
    width="36"
    height="30"
    viewBox="0 0 60 50"
    fill="none"
    className={`${className} select-none drop-shadow-sm`}
  >
    <path
      d="M10 10 C 10 4, 50 4, 50 10 C 50 24, 40 32, 30 32 L 20 42 L 22 32 C 14 32, 10 26, 10 10 Z"
      fill="#FFE600"
      stroke="#121316"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="18" r="2.2" fill="#121316" />
    <circle cx="36" cy="18" r="2.2" fill="#121316" />
    <path d="M 26 23 Q 30 27 34 23" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/** Hand-Drawn Soundwaves Doodle */
const SoundWavesDoodle = ({ className = '' }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 40 40"
    fill="none"
    className={`${className} select-none`}
  >
    <path d="M 10 14 Q 16 20 10 26" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
    <path d="M 18 9 Q 26 20 18 31" stroke="#FF6B4A" strokeWidth="3" strokeLinecap="round" />
    <path d="M 26 4 Q 36 20 26 36" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/** Hand-Drawn Curly Squiggle Doodle */
const CurlySquiggleDoodle = ({ className = '' }) => (
  <svg
    width="44"
    height="22"
    viewBox="0 0 60 30"
    fill="none"
    className={`${className} select-none text-[#121316]`}
  >
    <path
      d="M6 15 C 16 4, 28 4, 34 15 C 40 26, 50 26, 56 15"
      stroke="#121316"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
  </svg>
);

// ============================================================================
// 2. OVERSIZED HAND-DRAWN DOODLE CHARACTERS
// ============================================================================

/**
 * Left Character: "The TalkBridge Herald"
 * Holding a fluttering flagpole banner with the TalkBridge Mascot Logo inside.
 * Thick hand-drawn black outlines, flat solid vibrant yellow, expressive eyes & sneaker feet.
 */
export const HeroYellowHeraldDoodle = ({ className = 'w-full' }) => (
  <svg
    viewBox="0 0 260 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-sm overflow-visible`}
    aria-label="TalkBridge Yellow Herald Character"
  >
    {/* Flagpole & Fluttering Pennant Banner */}
    <g>
      <line
        x1="210"
        y1="18"
        x2="210"
        y2="245"
        stroke="#121316"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      {/* Banner Outline */}
      <path
        d="M 210 26 L 68 46 C 62 47, 60 52, 62 58 L 76 96 C 78 102, 76 106, 70 108 L 210 128 Z"
        fill="#FFFFFF"
        stroke="#121316"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />

      {/* TalkBridge Mascot Logo inside the Flag */}
      <svg
        x="72"
        y="42"
        width="132"
        height="82"
        viewBox="0 0 170 120"
        className="overflow-visible select-none"
      >
        {/* Left Character (Electric Blue Speech Bubble) */}
        <g>
          <circle cx="44" cy="22" r="9" fill="#2563EB" stroke="#121316" strokeWidth="2.6" />
          <path
            d="M 20 50 C 20 32, 38 24, 60 24 C 82 24, 94 36, 94 56 C 94 72, 80 82, 62 82 C 54 82, 46 90, 36 96 C 38 88, 38 84, 35 82 C 24 76, 20 65, 20 50 Z"
            fill="#2563EB"
            stroke="#121316"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M 43 49 Q 48 43 53 49" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 63 49 Q 68 43 73 49" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
          <ellipse cx="40" cy="57" rx="4.5" ry="3" fill="#FF7AA2" opacity="0.9" />
          <ellipse cx="76" cy="57" rx="4.5" ry="3" fill="#FF7AA2" opacity="0.9" />
          <path d="M 53 58 Q 58 65 63 58" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
        </g>

        {/* Connecting Bridge Arc with Dotted Line */}
        <path
          d="M 85 52 Q 98 42 110 52"
          stroke="#121316"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="2.5 3.5"
        />

        {/* Tiny Yellow Sparkle Star */}
        <path
          d="M 98 32 L 100 37 L 105 38 L 101 42 L 102 47 L 98 44 L 94 47 L 95 42 L 91 38 L 96 37 Z"
          fill="#FFE600"
          stroke="#121316"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Right Character (Warm Coral Speech Bubble) */}
        <g>
          <path
            d="M 108 26 Q 120 18 132 26 Q 140 28 144 31"
            stroke="#121316"
            strokeWidth="2.6"
            fill="#FFE600"
            strokeLinejoin="round"
          />
          <path
            d="M 96 58 C 96 40, 110 30, 128 30 C 146 30, 158 40, 158 58 C 158 74, 144 84, 130 84 C 122 84, 114 92, 108 98 C 110 90, 109 86, 106 84 C 98 79, 96 68, 96 58 Z"
            fill="#FF6B4A"
            stroke="#121316"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="116" cy="54" r="3.2" fill="#FFFFFF" />
          <circle cx="115" cy="54" r="1.6" fill="#121316" />
          <circle cx="134" cy="54" r="3.2" fill="#FFFFFF" />
          <circle cx="133" cy="54" r="1.6" fill="#121316" />
          <ellipse cx="110" cy="62" rx="4" ry="2.5" fill="#FFE600" opacity="0.9" />
          <ellipse cx="140" cy="62" rx="4" ry="2.5" fill="#FFE600" opacity="0.9" />
          <path d="M 120 62 Q 125 70 130 62" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      </svg>
    </g>

    {/* Hair Spikes / Tufts on Top of Head */}
    <path
      d="M 82 120 L 72 86 L 94 110 L 108 76 L 122 110 L 142 86 L 134 120 Z"
      fill="#FFE600"
      stroke="#121316"
      strokeWidth="3.4"
      strokeLinejoin="round"
    />

    {/* Round Energetic Body */}
    <circle
      cx="112"
      cy="162"
      r="54"
      fill="#FFE600"
      stroke="#121316"
      strokeWidth="3.6"
    />

    {/* Big Cartoon Eyes */}
    <g>
      <circle cx="96" cy="152" r="14" fill="#FFFFFF" stroke="#121316" strokeWidth="3" />
      <circle cx="100" cy="152" r="8" fill="#121316" />
      <circle cx="97" cy="148" r="3" fill="#FFFFFF" />
      <circle cx="130" cy="152" r="14" fill="#FFFFFF" stroke="#121316" strokeWidth="3" />
      <circle cx="134" cy="152" r="8" fill="#121316" />
      <circle cx="131" cy="148" r="3" fill="#FFFFFF" />
    </g>

    {/* Pink Blushing Cheeks */}
    <ellipse cx="80" cy="170" rx="7" ry="4" fill="#FF7AA2" opacity="0.9" />
    <ellipse cx="146" cy="170" rx="7" ry="4" fill="#FF7AA2" opacity="0.9" />

    {/* Big Joyful Cartoon Smile with Tongue */}
    <path
      d="M 98 175 Q 113 196 128 175 Z"
      fill="#121316"
      stroke="#121316"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path
      d="M 105 186 Q 113 194 121 186 Z"
      fill="#FF7AA2"
    />

    {/* Arms holding flagpole & gesturing */}
    <path
      d="M 160 162 Q 185 144 210 138"
      stroke="#121316"
      strokeWidth="3.6"
      strokeLinecap="round"
    />
    <circle cx="210" cy="138" r="8" fill="#FFE600" stroke="#121316" strokeWidth="2.8" />

    <path
      d="M 66 172 Q 46 178 36 166"
      stroke="#121316"
      strokeWidth="3.6"
      strokeLinecap="round"
    />
    <circle cx="34" cy="164" r="8" fill="#FFE600" stroke="#121316" strokeWidth="2.8" />

    {/* Mid-Stride Running Legs & Cute Cartoon Sneakers */}
    <g>
      <path
        d="M 94 212 L 82 242"
        stroke="#121316"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M 64 250 C 48 252 50 268 76 268 C 88 268 94 260 86 250 Z"
        fill="#121316"
        stroke="#121316"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="70" cy="258" r="3" fill="#FFE600" />

      <path
        d="M 126 212 L 140 242"
        stroke="#121316"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M 136 248 C 146 244 168 254 168 268 C 150 270 130 268 130 254 Z"
        fill="#121316"
        stroke="#121316"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="152" cy="258" r="3" fill="#FFE600" />
    </g>
  </svg>
);

/**
 * Right Character: "The Multimodal Audio Pal"
 * Inspired by the blue character in reference image.
 * Solid electric blue, pump top/antenna, hand on hip, big curious eyes looking toward center.
 */
export const HeroBluePalDoodle = ({ className = 'w-full' }) => (
  <svg
    viewBox="0 0 250 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-sm overflow-visible`}
    aria-label="TalkBridge Blue Pal Character"
  >
    {/* Soundwave Headphone / Dispenser Pump Top */}
    <g>
      <rect
        x="110"
        y="70"
        width="26"
        height="22"
        rx="4"
        fill="#FFFFFF"
        stroke="#121316"
        strokeWidth="3.2"
      />
      <path
        d="M 102 70 C 102 60 114 54 124 54 L 140 54 C 148 54 154 58 154 66 L 154 70 Z"
        fill="#FFE600"
        stroke="#121316"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M 94 62 Q 86 70 94 78 Q 102 70 94 62 Z"
        fill="#FFFFFF"
        stroke="#121316"
        strokeWidth="2.4"
      />
    </g>

    {/* Sassy Left Arm Pressing Own Head Top */}
    <path
      d="M 78 135 C 56 118 64 68 102 56"
      stroke="#121316"
      strokeWidth="3.6"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="102" cy="56" r="7" fill="#2563EB" stroke="#121316" strokeWidth="2.8" />

    {/* Friendly Cylindrical Body */}
    <rect
      x="78"
      y="90"
      width="90"
      height="128"
      rx="24"
      fill="#2563EB"
      stroke="#121316"
      strokeWidth="3.6"
    />

    {/* Expressive Cartoon Eyes Looking Left towards Center Headline */}
    <g>
      <circle cx="102" cy="140" r="14" fill="#FFFFFF" stroke="#121316" strokeWidth="3" />
      <circle cx="98" cy="140" r="8" fill="#121316" />
      <circle cx="95" cy="136" r="3" fill="#FFFFFF" />

      <circle cx="138" cy="140" r="14" fill="#FFFFFF" stroke="#121316" strokeWidth="3" />
      <circle cx="134" cy="140" r="8" fill="#121316" />
      <circle cx="131" cy="136" r="3" fill="#FFFFFF" />
    </g>

    {/* Rosy Yellow Cheek Accents */}
    <ellipse cx="88" cy="156" rx="5.5" ry="3.5" fill="#FFE600" opacity="0.95" />
    <ellipse cx="148" cy="156" rx="5.5" ry="3.5" fill="#FFE600" opacity="0.95" />

    {/* Sweet Sassy Grin */}
    <path
      d="M 112 164 Q 123 174 134 164"
      stroke="#FFFFFF"
      strokeWidth="3.2"
      strokeLinecap="round"
    />

    {/* Sassy Right Hand On Hip */}
    <path
      d="M 168 145 C 190 160 190 186 168 196"
      stroke="#121316"
      strokeWidth="3.6"
      strokeLinecap="round"
      fill="none"
    />

    {/* Sturdy Cartoon Legs & Blue Rounded Shoes */}
    <g>
      <line x1="104" y1="218" x2="104" y2="248" stroke="#121316" strokeWidth="3.6" />
      <path
        d="M 82 258 C 82 244 118 244 118 258 Z"
        fill="#2563EB"
        stroke="#121316"
        strokeWidth="3.2"
      />

      <line x1="144" y1="218" x2="144" y2="248" stroke="#121316" strokeWidth="3.6" />
      <path
        d="M 128 258 C 128 244 164 244 164 258 Z"
        fill="#2563EB"
        stroke="#121316"
        strokeWidth="3.2"
      />
    </g>
  </svg>
);

// ============================================================================
// 3. MAIN HERO COMPONENT
// Flanked 3-Column Desktop Grid with Wide Separation — Zero Overlap on 'Connection.'
// ============================================================================
export const HeroSection = () => {
  const { isLoggedin, user } = useAuth();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomCode.trim()) {
      navigate(`/room/${encodeURIComponent(roomCode.trim())}`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100svh-4.5rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-10 xl:px-12 py-6 sm:py-10 select-none overflow-x-clip">
      
      {/* 3-Column Responsive Grid with Generous Spacing to Prevent Any Overlap */}
      <div className="relative w-full max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center lg:items-end">
        
        {/* ===================================================================
            COLUMN 1: Left Character (The Yellow Herald)
            Positioned to the FAR LEFT (justify-start) to never touch 'C' in Connection
           =================================================================== */}
        <div className="hidden lg:flex lg:col-span-3 justify-start items-end pb-2">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: PREMIUM_EASE }}
            className="w-full flex justify-start relative"
          >
            {/* Cute Blue Star floating near the Herald's flag */}
            <motion.div
              animate={{ rotate: [0, -15, 0], y: [0, -5, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -top-8 left-4 z-20"
            >
              <SparkleDoodle color="#38BDF8" size={24} />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="cursor-pointer w-full max-w-[270px] xl:max-w-[320px] 2xl:max-w-[360px]"
            >
              <HeroYellowHeraldDoodle className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ===================================================================
            COLUMN 2: Center Stage (Headline, Subtitle, and Interactive CTAs)
            Cleanly spaced with cute doodles around it
           =================================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col items-center text-center max-w-xl xl:max-w-2xl mx-auto w-full px-2 relative"
        >
          {/* Cute Floating Doodles around the Headline (Stars, Heart, Soundwaves) */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -top-8 -left-6 sm:-left-10 hidden sm:block z-10"
          >
            <MiniSmileBubbleDoodle />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -top-6 -right-6 sm:-right-10 hidden sm:block z-10"
          >
            <SoundWavesDoodle />
          </motion.div>

          {/* Eyebrow Sticker Badge */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5 inline-flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#38BDF8] px-4 py-1 text-xs font-black uppercase tracking-wider text-[#121316] shadow-[2px_2.5px_0_#121316] select-none">
              <span>⚡ REAL-TIME SPEECH & SIGN</span>
            </div>
            
            <motion.div
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none"
            >
              <SparkleDoodle color="#FFE600" size={20} />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none"
            >
              <MiniHeartDoodle size={18} />
            </motion.div>
          </motion.div>

          {/* Big Bold Headline: "Different voices. One connection." */}
          <div className="relative">
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-[#121316] uppercase tracking-tight leading-[1.04] select-none"
            >
              <span className="block">
                Different{' '}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">Voices.</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.55, delay: 0.35, ease: PREMIUM_EASE }}
                    className="absolute -bottom-1 left-0 -z-0 h-3.5 sm:h-5 xl:h-6 w-full origin-left rounded-md bg-[#FFE600]/90 -rotate-1 pointer-events-none"
                  />
                </span>
              </span>

              <span className="block mt-2 sm:mt-3">
                <span className="relative inline-flex items-center justify-center rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#121316] bg-[#FFE600] px-3 sm:px-4 py-0.5 sm:py-1 -rotate-3 shadow-[2.5px_3px_0_#121316] mr-2 sm:mr-3 align-middle transition-transform hover:rotate-0">
                  <span className="font-telma italic font-black lowercase text-[#121316] text-2xl sm:text-4xl lg:text-4xl xl:text-5xl leading-none">
                    one
                  </span>
                </span>
                {/* Connection. (Full space, completely unobscured) */}
                <span className="inline-block relative">
                  Connection.
                  {/* Cute floating star accent near the 'n.' in Connection */}
                  <motion.span
                    animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3 -right-6 hidden sm:inline-block pointer-events-none"
                  >
                    <SparkleDoodle color="#FF7AA2" size={18} />
                  </motion.span>
                </span>
              </span>
            </motion.h1>
          </div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="font-sans mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-stone-600 font-medium max-w-lg mx-auto leading-relaxed"
          >
            An intuitive dual-way video bridge translating sign language, voice, and live captions in real time — so no voice is ever left behind.
          </motion.p>

          {/* Interactive CTA Form / Button Bar */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-7 w-full max-w-md mx-auto relative">
            
            {/* Cute Squiggle Doodle beside the CTA */}
            <div className="absolute -left-12 top-2 hidden xl:block pointer-events-none opacity-80">
              <CurlySquiggleDoodle />
            </div>

            {isLoggedin ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-2.5 rounded-full border-2 border-[#121316] bg-white px-5 py-2.5 shadow-[3px_3px_0_#121316]">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs sm:text-sm font-bold text-[#121316]">
                    Signed in as <span className="underline decoration-[#FFE600] decoration-2">{user?.name}</span>
                  </span>
                </div>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#121316] bg-[#2563EB] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[3px_3px_0_#121316] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[4px_4px_0_#121316]"
                >
                  <span>Launch Bridge ⚡</span>
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleJoinRoom}
                className="flex items-center rounded-full border-2 border-[#121316] bg-white p-1.5 shadow-[3.5px_4px_0_#121316] transition-shadow duration-200 focus-within:shadow-[5px_6px_0_#121316]"
              >
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Enter meeting room code..."
                  className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm font-bold text-[#121316] placeholder-stone-400 focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#FFE600] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#121316] transition-all hover:bg-[#fed700] hover:scale-[1.02] active:scale-95 shrink-0"
                >
                  <span>Join Call</span>
                  <span className="text-sm">⚡</span>
                </button>
              </form>
            )}

            {/* Quick Navigation Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-stone-600">
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white/90 px-3.5 py-1.5 hover:border-[#121316] hover:bg-white transition"
              >
                <span>How It Works</span>
                <span className="text-stone-400">↗</span>
              </a>
              <a
                href="#what-we-offer"
                className="inline-flex items-center gap-1 rounded-full border-2 border-[#121316] bg-amber-100 px-3.5 py-1.5 text-amber-950 hover:bg-amber-200 transition shadow-[1.5px_2px_0_#121316]"
              >
                <span>What We Offer ⚡</span>
              </a>
              <a
                href="#faq"
                className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white/90 px-3.5 py-1.5 hover:border-[#121316] hover:bg-white transition"
              >
                <span>FAQs</span>
              </a>
            </div>
          </motion.div>

          {/* =================================================================
              MOBILE & TABLET CHARACTER DUO (Big and charming below CTAs)
             ================================================================= */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-12 flex lg:hidden items-center justify-center gap-6 sm:gap-10 w-full max-w-lg mx-auto"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-36 sm:w-48"
            >
              <HeroYellowHeraldDoodle className="w-full h-auto" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="w-36 sm:w-48"
            >
              <HeroBluePalDoodle className="w-full h-auto" />
            </motion.div>
          </motion.div>

        </motion.div>

        {/* ===================================================================
            COLUMN 3: Right Character (The Blue Audio Pal)
            Positioned to the FAR RIGHT (justify-end) to never touch 'N' in Connection
           =================================================================== */}
        <div className="hidden lg:flex lg:col-span-3 justify-end items-end pb-2">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: PREMIUM_EASE }}
            className="w-full flex justify-end relative"
          >
            {/* Cute Yellow Star floating near the Audio Pal's antenna */}
            <motion.div
              animate={{ rotate: [0, 15, 0], y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="pointer-events-none absolute -top-8 right-6 z-20"
            >
              <SparkleDoodle color="#FFE600" size={24} />
            </motion.div>

            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="cursor-pointer w-full max-w-[270px] xl:max-w-[320px] 2xl:max-w-[360px]"
            >
              <HeroBluePalDoodle className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;
