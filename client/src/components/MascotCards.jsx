import React from 'react';
import { motion } from 'motion/react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// Left Card Mascot: Cheerful Retro Sun & Cloud Mascot (Sky Blue Theme)
export const SunVisionMascot = () => (
  <svg viewBox="0 0 240 240" className="w-full h-44 drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2" fill="none">
    {/* Confetti & Sparkles */}
    <circle cx="35" cy="50" r="4" fill="#FFE600" stroke="#121316" strokeWidth="2" />
    <circle cx="205" cy="45" r="5" fill="#FF7AA2" stroke="#121316" strokeWidth="2" />
    <path d="M45 110L49 116L55 120L49 124L45 130L41 124L35 120L41 116Z" fill="#FFF" stroke="#121316" strokeWidth="1.5" />
    <path d="M195 95L198 100L203 103L198 106L195 111L192 106L187 103L192 100Z" fill="#FFF" stroke="#121316" strokeWidth="1.5" />

    {/* Sun Rays */}
    <g stroke="#121316" strokeWidth="3" strokeLinecap="round" fill="#FFD028">
      <path d="M120 28L120 12" />
      <path d="M72 48L60 36" />
      <path d="M168 48L180 36" />
      <path d="M45 95L30 92" />
      <path d="M195 95L210 92" />
    </g>

    {/* Fluffy Sun Petals */}
    <g fill="#FFD028" stroke="#121316" strokeWidth="3">
      <circle cx="120" cy="98" r="46" />
      <path d="M84 76C82 66 94 56 104 60C110 50 125 50 132 60C142 56 154 66 152 76C162 82 165 96 158 106C164 116 158 130 148 134C144 144 130 148 122 142C112 148 98 144 94 134C84 130 78 116 84 106C78 96 80 82 84 76Z" />
    </g>

    {/* Sun Face */}
    <circle cx="120" cy="100" r="34" fill="#FFE259" stroke="#121316" strokeWidth="2.5" />

    {/* Retro Sleepy / Happy Cartoon Eyes */}
    <path d="M106 95C108 90 115 90 117 95" stroke="#121316" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M125 95C127 90 134 90 136 95" stroke="#121316" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Rosy Cheeks */}
    <ellipse cx="103" cy="104" rx="4.5" ry="3" fill="#FF8BA7" />
    <ellipse cx="137" cy="104" rx="4.5" ry="3" fill="#FF8BA7" />

    {/* Cheerful Smile */}
    <path d="M115 105C118 110 124 110 127 105" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />

    {/* Cloud Feet / Pillow Base */}
    <g fill="#FFFFFF" stroke="#121316" strokeWidth="3">
      <path d="M68 152C60 152 54 145 56 137C58 128 68 125 74 129C78 121 90 120 96 127C102 120 118 120 124 128C132 120 146 122 150 130C158 126 168 130 168 139C168 148 160 152 152 152Z" />
    </g>
  </svg>
);

// Center Card Mascot: Retro Cartoon White Glove "Peace / Sign" (Bubblegum Pink Theme)
export const PeaceGloveMascot = () => (
  <svg viewBox="0 0 240 240" className="w-full h-44 drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" fill="none">
    {/* Sparkling Retro Flowers */}
    <g transform="translate(32, 50)">
      <circle cx="12" cy="12" r="12" fill="#84D874" stroke="#121316" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="#FFE600" stroke="#121316" strokeWidth="2" />
    </g>
    <g transform="translate(180, 54)">
      <circle cx="12" cy="12" r="12" fill="#FF8BA7" stroke="#121316" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="#FFE600" stroke="#121316" strokeWidth="2" />
    </g>

    {/* Floating Stars */}
    <path d="M50 115L53 121L60 124L53 127L50 133L47 127L40 124L47 121Z" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />
    <path d="M192 118L195 124L202 127L195 130L192 136L189 130L182 127L189 124Z" fill="#FFE600" stroke="#121316" strokeWidth="1.5" />

    {/* Green Wrist Base / Pedestal */}
    <rect x="105" y="150" width="30" height="32" rx="4" fill="#38BDF8" stroke="#121316" strokeWidth="3" />
    <path d="M100 152C100 148 108 146 120 146C132 146 140 148 140 152" stroke="#121316" strokeWidth="3" fill="#FFE600" />

    {/* Cartoon White Glove Base Hand */}
    <g fill="#FFFFFF" stroke="#121316" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
      {/* Palm body */}
      <path d="M96 112C96 98 108 88 120 88C132 88 144 98 144 114C144 134 138 148 136 150L104 150C102 148 96 134 96 112Z" />

      {/* Index Finger (Pointing Up) */}
      <path d="M106 95L106 38C106 31 116 31 116 38L116 88" />

      {/* Middle Finger (Pointing Up - Peace Sign) */}
      <path d="M120 88L120 34C120 27 130 27 130 34L130 95" />

      {/* Folded Ring & Pinky Fingers */}
      <path d="M130 98C136 96 142 102 142 108C142 114 135 118 128 118" />
      <path d="M128 118C134 117 139 122 139 127C139 133 133 136 126 136" />

      {/* Folded Thumb over Palm */}
      <path d="M96 108C92 110 90 120 96 125C104 130 114 126 116 118" />

      {/* Glove Wrinkle Creases */}
      <path d="M110 110L116 110" strokeWidth="2.5" />
      <path d="M109 116L115 116" strokeWidth="2.5" />
      <path d="M110 122L116 122" strokeWidth="2.5" />
    </g>
  </svg>
);

// Right Card Mascot: Cheerful Daisy / Audio Mascot (Tangerine / Orange Theme)
export const DaisyAudioMascot = () => (
  <svg viewBox="0 0 240 240" className="w-full h-44 drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" fill="none">
    {/* Blue Star & Sparkles */}
    <path d="M185 36L189 44L198 47L189 50L185 58L181 50L172 47L181 44Z" fill="#38BDF8" stroke="#121316" strokeWidth="2" />
    <circle cx="45" cy="55" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="2" />
    <circle cx="198" cy="115" r="3.5" fill="#FF7AA2" stroke="#121316" strokeWidth="1.5" />

    {/* Daisy Yellow Petals Ring */}
    <g fill="#FFD028" stroke="#121316" strokeWidth="3">
      <ellipse cx="120" cy="58" rx="14" ry="20" />
      <ellipse cx="120" cy="152" rx="14" ry="20" />
      <ellipse cx="73" cy="105" rx="20" ry="14" />
      <ellipse cx="167" cy="105" rx="20" ry="14" />
      <ellipse cx="87" cy="72" rx="16" ry="18" transform="rotate(-45 87 72)" />
      <ellipse cx="153" cy="72" rx="16" ry="18" transform="rotate(45 153 72)" />
      <ellipse cx="87" cy="138" rx="16" ry="18" transform="rotate(45 87 138)" />
      <ellipse cx="153" cy="138" rx="16" ry="18" transform="rotate(-45 153 138)" />
    </g>

    {/* Flower Face Center Disc */}
    <circle cx="120" cy="105" r="36" fill="#8CE0D8" stroke="#121316" strokeWidth="3" />

    {/* Retro Cartoon Side-Glance Eyes */}
    <g fill="#FFFFFF" stroke="#121316" strokeWidth="2.5">
      <ellipse cx="108" cy="98" rx="8" ry="12" />
      <ellipse cx="128" cy="98" rx="8" ry="12" />
      <ellipse cx="106" cy="99" rx="4.5" ry="6" fill="#121316" stroke="none" />
      <ellipse cx="126" cy="99" rx="4.5" ry="6" fill="#121316" stroke="none" />
      <circle cx="104" cy="96" r="1.5" fill="#FFF" stroke="none" />
      <circle cx="124" cy="96" r="1.5" fill="#FFF" stroke="none" />
    </g>

    {/* Cheerful Pink Nose & Mouth */}
    <ellipse cx="118" cy="108" rx="4" ry="3" fill="#FF8BA7" stroke="#121316" strokeWidth="1.5" />
    <path d="M112 114C115 119 123 119 126 114" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: PREMIUM_EASE,
    },
  },
};

const centerCardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: {
    opacity: 1,
    y: -8,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: PREMIUM_EASE,
    },
  },
};

export const MascotCardTrio = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto mt-2 sm:mt-4 grid max-w-5xl grid-cols-1 items-end gap-5 px-4 sm:grid-cols-3 sm:px-6"
    >
      {/* Card 1: Sky Blue */}
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -10,
          scale: 1.02,
          rotate: -0.5,
          boxShadow: '0 16px 0 #121316',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-[#121316] bg-[#42B4FC] p-4 sm:p-5 shadow-[0_8px_0_#121316] sm:shadow-[0_10px_0_#121316] cursor-pointer min-w-0 box-border"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-[#121316] bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#121316]">
            Vision & Hands
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#121316] bg-[#FFE600] text-xs font-bold">
            01
          </span>
        </div>

        <div className="my-1.5 flex justify-center">
          <SunVisionMascot />
        </div>

        <div className="rounded-2xl border-2 border-[#121316] bg-white/95 p-3.5 shadow-sm backdrop-blur-sm min-w-0">
          <h3 className="font-display text-base font-extrabold text-[#121316]">
            Sign Language → Voice
          </h3>
          <p className="font-sans mt-1 text-xs text-stone-600 leading-relaxed font-normal">
            Tracks 21 hand landmarks in real-time via standard webcams without extra sensors.
          </p>
        </div>
      </motion.div>

      {/* Card 2: Center Hero Card (Bubblegum Pink - Taller and Elevated) */}
      <motion.div
        variants={centerCardVariants}
        whileHover={{
          y: -14,
          scale: 1.025,
          rotate: 0.5,
          boxShadow: '0 18px 0 #121316',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border-2 border-[#121316] bg-[#FF7DA7] p-4.5 sm:p-5.5 shadow-[0_10px_0_#121316] sm:shadow-[0_14px_0_#121316] cursor-pointer min-w-0 box-border"
      >
        {/* Floating Tag */}
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-[#121316] bg-[#FFE600] px-3 py-0.5 text-xs font-extrabold text-[#121316]">
            ⚡ Multimodal Core
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#121316] bg-white text-xs font-bold">
            02
          </span>
        </div>

        <div className="my-1 flex justify-center">
          <PeaceGloveMascot />
        </div>

        <div className="rounded-2xl border-2 border-[#121316] bg-white/95 p-3.5 shadow-sm backdrop-blur-sm min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-extrabold text-[#121316]">
              The Real-Time Bridge
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
              Live AI
            </span>
          </div>
          <p className="font-sans mt-1 text-xs text-stone-600 leading-relaxed font-normal">
            Google Gemini synthesizes gesture streams into fluent human speech with zero hardware.
          </p>
        </div>
      </motion.div>

      {/* Card 3: Sunshine Coral / Orange */}
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -10,
          scale: 1.02,
          rotate: 0.5,
          boxShadow: '0 16px 0 #121316',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-[#121316] bg-[#FFAE33] p-4 sm:p-5 shadow-[0_8px_0_#121316] sm:shadow-[0_10px_0_#121316] cursor-pointer min-w-0 box-border"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-[#121316] bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#121316]">
            Speech & Audio
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#121316] bg-[#38BDF8] text-xs font-bold text-white">
            03
          </span>
        </div>

        <div className="my-1.5 flex justify-center">
          <DaisyAudioMascot />
        </div>

        <div className="rounded-2xl border-2 border-[#121316] bg-white/95 p-3.5 shadow-sm backdrop-blur-sm min-w-0">
          <h3 className="font-display text-base font-extrabold text-[#121316]">
            Speech → Visual Signs
          </h3>
          <p className="font-sans mt-1 text-xs text-stone-600 leading-relaxed font-normal">
            Instantly turns spoken audio into visual flashcards & clear subtitles for the deaf.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
