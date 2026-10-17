import React from 'react';
import { motion } from 'motion/react';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// ============================================================================
// 1. Wheelchair Person Mascot (Universal Physical Mobility & Accessible Navigation)
// Reference: Open Doodles style (person1.svg / person2.svg)
// ============================================================================
export const WheelchairPersonMascot = () => (
  <svg
    viewBox="0 0 240 240"
    className="w-full h-34 sm:h-38 max-w-[200px] drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1"
    fill="none"
  >
    {/* Circular Doodle Portal Frame */}
    <circle cx="120" cy="118" r="92" fill="#E0F2FE" stroke="#121316" strokeWidth="2.5" />

    {/* Floating Retro 4-point Stars & Sparkles */}
    <path
      d="M38 48L41 56L49 59L41 62L38 70L35 62L27 59L35 56Z"
      fill="#FFE600"
      stroke="#121316"
      strokeWidth="1.8"
    />
    <circle cx="202" cy="48" r="4.5" fill="#FF7AA2" stroke="#121316" strokeWidth="2" />
    <circle cx="28" cy="132" r="3.5" fill="#38BDF8" stroke="#121316" strokeWidth="1.5" />
    <path
      d="M196 150L199 155L205 158L199 161L196 167L193 161L187 158L193 155Z"
      fill="#FFE600"
      stroke="#121316"
      strokeWidth="1.5"
    />

    {/* Speed / Motion Breeze Lines */}
    <path d="M46 142L62 142" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M40 152L56 152" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" />

    {/* Wheelchair Main Big Wheel (Handrim, Tire, Hub, Spokes) */}
    <circle cx="98" cy="150" r="42" fill="none" stroke="#FFE600" strokeWidth="3.2" />
    <circle cx="98" cy="150" r="37" fill="#FFFFFF" stroke="#121316" strokeWidth="3.5" />
    <circle cx="98" cy="150" r="32" fill="#F8FAFC" stroke="#121316" strokeWidth="1.8" />
    {/* Spokes */}
    <g stroke="#121316" strokeWidth="2" strokeLinecap="round">
      <line x1="98" y1="118" x2="98" y2="182" />
      <line x1="66" y1="150" x2="130" y2="150" />
      <line x1="75" y1="127" x2="121" y2="173" />
      <line x1="75" y1="173" x2="121" y2="127" />
    </g>
    {/* Wheel Hub */}
    <circle cx="98" cy="150" r="7.5" fill="#121316" />
    <circle cx="98" cy="150" r="3" fill="#FFE600" />

    {/* Wheelchair Frame & Seat */}
    <path
      d="M84 92L92 136L126 142"
      stroke="#121316"
      strokeWidth="3.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M86 116L116 114" stroke="#121316" strokeWidth="3.5" strokeLinecap="round" />
    {/* Seat Cushion */}
    <rect x="90" y="132" width="38" height="8" rx="4" fill="#38BDF8" stroke="#121316" strokeWidth="2.5" />

    {/* Footrest & Front Caster Wheel */}
    <path
      d="M126 142L142 166L156 166"
      stroke="#121316"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M142 166L148 174" stroke="#121316" strokeWidth="3" strokeLinecap="round" />
    <circle cx="148" cy="178" r="8" fill="#FFFFFF" stroke="#121316" strokeWidth="3" />
    <circle cx="148" cy="178" r="2.5" fill="#121316" />

    {/* Person Body (Stylish Hoodie) */}
    <path
      d="M96 96C98 86 116 86 120 96L124 134L98 134Z"
      fill="#FF7DA7"
      stroke="#121316"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* Person Legs & Shoes */}
    <path d="M106 130L136 138" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
    <path d="M136 138L144 162" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
    {/* Sneaker */}
    <path
      d="M140 162L158 162C162 162 162 168 156 168L138 168Z"
      fill="#FFFFFF"
      stroke="#121316"
      strokeWidth="2.5"
    />

    {/* Left Arm Resting on Pushrim */}
    <path
      d="M102 98L108 116L118 115"
      stroke="#121316"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />

    {/* Neck & Head */}
    <rect x="106" y="86" width="10" height="9" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
    <circle cx="112" cy="74" r="16" fill="#FFE2B7" stroke="#121316" strokeWidth="2.5" />

    {/* Happy Face Features */}
    <path d="M115 72C116 70 120 70 121 72" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <ellipse cx="118" cy="77" rx="3.5" ry="2.2" fill="#FF8BA7" />
    <path d="M117 79C119 82 123 82 124 79" stroke="#121316" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Cool Yellow Beanie / Cap with Visor */}
    <path d="M96 72C96 56 126 56 128 72Z" fill="#FFE600" stroke="#121316" strokeWidth="2.5" />
    <path d="M124 70L137 72L126 76Z" fill="#FFE600" stroke="#121316" strokeWidth="2" />

    {/* Right Arm Raised Waving Enthusiastically */}
    <path
      d="M116 96L134 88L148 74"
      stroke="#121316"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Waving Hand with Thumbs Up / Peace */}
    <path
      d="M148 74C150 70 155 70 156 73C158 71 161 72 161 75C161 79 156 82 150 81Z"
      fill="#FFFFFF"
      stroke="#121316"
      strokeWidth="2.2"
    />
  </svg>
);

// ============================================================================
// 2. Deaf & Hard-of-Hearing Mascot (Person Signing + Muted Audio Cross Symbol)
// Reference: Specific user request: "person who cant heear , with audio sign with a cross on it"
// ============================================================================
export const DeafHearingSignMascot = () => (
  <svg
    viewBox="0 0 240 240"
    className="w-full h-34 sm:h-38 max-w-[200px] drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
    fill="none"
  >
    {/* Circular Doodle Portal Frame */}
    <circle cx="120" cy="118" r="92" fill="#FCE7F3" stroke="#121316" strokeWidth="2.5" />

    {/* Floating Retro Stars & Sparkles */}
    <path
      d="M34 56L37 63L44 66L37 69L34 76L31 69L24 66L31 63Z"
      fill="#FFE600"
      stroke="#121316"
      strokeWidth="1.8"
    />
    <circle cx="48" cy="110" r="4" fill="#38BDF8" stroke="#121316" strokeWidth="1.8" />
    <circle cx="206" cy="144" r="4" fill="#FFE600" stroke="#121316" strokeWidth="1.8" />

    {/* Speech-to-Sign Visual Flashcard Bubble */}
    <g transform="translate(24, 138)">
      <rect x="0" y="0" width="56" height="26" rx="8" fill="#FFFFFF" stroke="#121316" strokeWidth="2.2" />
      <path d="M12 9L24 9 M28 9L44 9 M12 17L36 17" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <polygon points="18,26 24,26 21,31" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
    </g>

    {/* Person Body (Expressive Communicator) */}
    <path
      d="M92 118C92 102 148 102 148 118L152 188L88 188Z"
      fill="#38BDF8"
      stroke="#121316"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />
    {/* Cute Collar */}
    <path d="M112 112L120 124L128 112" stroke="#121316" strokeWidth="2.5" fill="#FFFFFF" />

    {/* Head & Neck */}
    <rect x="114" y="94" width="12" height="16" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
    <circle cx="120" cy="80" r="21" fill="#FFE2B7" stroke="#121316" strokeWidth="2.8" />

    {/* Hair Buns / Expressive Bob Hair */}
    <path
      d="M97 78C95 54 145 54 143 78C141 70 131 66 120 66C109 66 99 70 97 78Z"
      fill="#121316"
    />
    <circle cx="100" cy="58" r="8" fill="#121316" />
    <circle cx="140" cy="58" r="8" fill="#121316" />

    {/* Smiling Cartoon Eyes */}
    <path d="M110 78C112 75 116 75 118 78" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M122 78C124 75 128 75 130 78" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Rosy Cheeks & Cheerful Smile */}
    <ellipse cx="108" cy="84" rx="4" ry="2.5" fill="#FF8BA7" />
    <ellipse cx="132" cy="84" rx="4" ry="2.5" fill="#FF8BA7" />
    <path d="M116 86C118 90 122 90 124 86" stroke="#121316" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Real-time Sign Language Hands (Two Active Hands Signing) */}
    {/* Left Arm & Hand */}
    <path
      d="M94 122L78 138L92 148"
      stroke="#121316"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <g transform="translate(86, 140)">
      <path
        d="M6 10L12 2L16 6L10 16L4 14Z"
        fill="#FFFFFF"
        stroke="#121316"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </g>

    {/* Right Arm & Hand */}
    <path
      d="M146 122L162 138L148 148"
      stroke="#121316"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <g transform="translate(142, 140)">
      <path
        d="M4 10L-2 2L-6 6L0 16L6 14Z"
        fill="#FFFFFF"
        stroke="#121316"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </g>

    {/* =====================================================================
        PROMINENT AUDIO SPEAKER WITH CROSSED-OUT "X"
        Explicitly requested: "with audio sign with a cross on it"
        ===================================================================== */}
    <g transform="translate(148, 38)">
      {/* Outer Glow Badge */}
      <circle cx="34" cy="34" r="32" fill="#FFE600" stroke="#121316" strokeWidth="2.5" />
      <circle cx="34" cy="34" r="28" fill="#FFFFFF" stroke="#121316" strokeWidth="2.2" />

      {/* Speaker Icon Body */}
      <rect x="18" y="28" width="10" height="12" rx="2" fill="#121316" />
      <path d="M26 28L38 20L38 48L26 40Z" fill="#121316" />

      {/* Audio Wave Arcs */}
      <path d="M43 27C47 31 47 37 43 41" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M48 22C54 28 54 40 48 46" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* BOLD RED CROSS-OUT (Universal Mute / Non-Hearing Symbol) */}
      <line x1="14" y1="14" x2="54" y2="54" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="54" y1="14" x2="14" y2="54" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
    </g>
  </svg>
);

// ============================================================================
// 3. Vision & Audio AI Mascot (Vision-Impaired / Audio Narration & Tactile Bridge)
// Reference: card.png deep violet / lilac retro styling
// ============================================================================
export const VisionAudioMascot = () => (
  <svg
    viewBox="0 0 240 240"
    className="w-full h-34 sm:h-38 max-w-[200px] drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1"
    fill="none"
  >
    {/* Circular Doodle Portal Frame */}
    <circle cx="120" cy="118" r="92" fill="#EEF2FF" stroke="#121316" strokeWidth="2.5" />

    {/* Floating Braille & Tactile Sparkle Dots */}
    <circle cx="42" cy="54" r="4" fill="#FFE600" stroke="#121316" strokeWidth="1.8" />
    <circle cx="52" cy="54" r="4" fill="#818CF8" stroke="#121316" strokeWidth="1.8" />
    <circle cx="42" cy="66" r="4" fill="#FF7AA2" stroke="#121316" strokeWidth="1.8" />
    <circle cx="52" cy="66" r="4" fill="#FFE600" stroke="#121316" strokeWidth="1.8" />
    <circle cx="42" cy="78" r="4" fill="#38BDF8" stroke="#121316" strokeWidth="1.8" />
    <circle cx="52" cy="78" r="4" fill="#84D874" stroke="#121316" strokeWidth="1.8" />

    {/* Floating AI Vision Eye / Lens Badge at Top Right */}
    <g transform="translate(162, 42)">
      <circle cx="22" cy="22" r="20" fill="#FFE600" stroke="#121316" strokeWidth="2.5" />
      <ellipse cx="22" cy="22" rx="14" ry="9" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
      <circle cx="22" cy="22" r="5" fill="#6366F1" />
      <circle cx="20" cy="20" r="1.8" fill="#FFFFFF" />
    </g>

    {/* Person Body (Warm Knit Sweater) */}
    <path
      d="M92 118C92 102 148 102 148 118L152 188L88 188Z"
      fill="#818CF8"
      stroke="#121316"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />

    {/* Head & Neck */}
    <rect x="114" y="94" width="12" height="16" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
    <circle cx="120" cy="80" r="21" fill="#FFE2B7" stroke="#121316" strokeWidth="2.8" />

    {/* Wavy Retro Haircut */}
    <path
      d="M97 78C94 54 146 54 143 78C141 72 131 66 120 66C109 66 99 72 97 78Z"
      fill="#121316"
    />

    {/* Cool Dark Round Sunglasses */}
    <g stroke="#121316" strokeWidth="2.2">
      <rect x="105" y="74" width="12" height="10" rx="3.5" fill="#121316" />
      <rect x="123" y="74" width="12" height="10" rx="3.5" fill="#121316" />
      <line x1="117" y1="78" x2="123" y2="78" strokeWidth="2.8" />
      {/* Glint on Lenses */}
      <line x1="108" y1="76" x2="111" y2="81" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="126" y1="76" x2="129" y2="81" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Cheerful Gentle Smile & Rosy Cheeks */}
    <ellipse cx="107" cy="87" rx="3.5" ry="2" fill="#FF8BA7" />
    <ellipse cx="133" cy="87" rx="3.5" ry="2" fill="#FF8BA7" />
    <path d="M116 88C118 92 122 92 124 88" stroke="#121316" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Sleek AI Audio Headphones */}
    <path d="M96 74C96 50 144 50 144 74" stroke="#FFE600" strokeWidth="4" strokeLinecap="round" fill="none" />
    <rect x="94" y="70" width="7" height="16" rx="3.5" fill="#121316" stroke="#121316" strokeWidth="1.5" />
    <rect x="139" y="70" width="7" height="16" rx="3.5" fill="#121316" stroke="#121316" strokeWidth="1.5" />

    {/* Audio Soundwave Waves from Headphones */}
    <path d="M150 72C155 76 155 82 150 86" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M156 66C163 73 163 85 156 92" stroke="#FFE600" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Hand Holding Smart Tactile Cane */}
    <path
      d="M136 134L174 188"
      stroke="#FFFFFF"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path d="M136 134L174 188" stroke="#121316" strokeWidth="1.8" strokeLinecap="round" />
    {/* Red Smart Haptic Tip */}
    <path d="M166 177L174 188" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="174" cy="188" r="3" fill="#121316" />

    {/* Glove Holding Cane */}
    <circle cx="136" cy="134" r="6" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />
  </svg>
);

// ============================================================================
// 4. Community & Caregiver Connection Mascot ("Buddy Up" Celebration & Safety)
// Reference: offer.png Card 4 & card.png dog illustration
// ============================================================================
export const CommunityBuddyMascot = () => (
  <svg
    viewBox="0 0 240 240"
    className="w-full h-34 sm:h-38 max-w-[200px] drop-shadow-sm select-none transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
    fill="none"
  >
    {/* Circular Doodle Portal Frame */}
    <circle cx="120" cy="118" r="92" fill="#FEF3C7" stroke="#121316" strokeWidth="2.5" />

    {/* Floating Safety Shield at Top Left */}
    <g transform="translate(28, 42)">
      <path
        d="M20 4C20 4 30 0 38 4C38 18 28 29 20 34C12 29 2 18 2 4C10 0 20 4 20 4Z"
        fill="#84D874"
        stroke="#121316"
        strokeWidth="2.2"
      />
      <path d="M13 18L18 23L27 12" stroke="#121316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Floating Retro Heart & Star Sparkle */}
    <path
      d="M188 42C188 38 184 34 180 34C176 34 174 38 174 38C174 38 172 34 168 34C164 34 160 38 160 42C160 50 174 58 174 58C174 58 188 50 188 42Z"
      fill="#FF7AA2"
      stroke="#121316"
      strokeWidth="2"
    />
    <circle cx="198" cy="110" r="4.5" fill="#38BDF8" stroke="#121316" strokeWidth="2" />

    {/* Jumping Cheerful Character (Arms Raised in Joy) */}
    {/* Head & Neck */}
    <rect x="94" y="68" width="10" height="12" fill="#FFE2B7" stroke="#121316" strokeWidth="2" />
    <circle cx="98" cy="56" r="17" fill="#FFE2B7" stroke="#121316" strokeWidth="2.5" />

    {/* Cap & Hair */}
    <path d="M82 54C82 40 114 40 114 54Z" fill="#FF7DA7" stroke="#121316" strokeWidth="2.2" />
    <path d="M110 52L122 53L112 57Z" fill="#FF7DA7" stroke="#121316" strokeWidth="1.8" />

    {/* Smiling Face */}
    <circle cx="94" cy="55" r="2" fill="#121316" />
    <circle cx="104" cy="55" r="2" fill="#121316" />
    <ellipse cx="91" cy="60" rx="3" ry="1.8" fill="#FF8BA7" />
    <ellipse cx="107" cy="60" rx="3" ry="1.8" fill="#FF8BA7" />
    <path d="M96 61C98 65 102 65 104 61" stroke="#121316" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Leaping Torso */}
    <path
      d="M84 78C84 72 118 72 120 78L116 128L80 128Z"
      fill="#38BDF8"
      stroke="#121316"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* Right Arm Pumped High in Victory */}
    <path
      d="M114 78L130 52L138 36"
      stroke="#121316"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="138" cy="34" r="5.5" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />

    {/* Left Arm Outstretched Welcoming */}
    <path
      d="M84 82L66 74L56 78"
      stroke="#121316"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="54" cy="78" r="5" fill="#FFFFFF" stroke="#121316" strokeWidth="2" />

    {/* Leaping Legs in Dynamic Motion */}
    <path d="M88 126L74 148L62 142" stroke="#121316" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M106 126L118 144L132 138" stroke="#121316" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="60" cy="142" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="1.8" />
    <circle cx="133" cy="138" r="4.5" fill="#FFE600" stroke="#121316" strokeWidth="1.8" />

    {/* Cute Sitting Companion Dog (from card.png reference) */}
    <g transform="translate(138, 126)">
      {/* Dog Body */}
      <path
        d="M12 28C8 28 2 24 2 16C2 10 10 8 16 10C24 10 32 16 32 24C32 28 26 28 12 28Z"
        fill="#FFAE33"
        stroke="#121316"
        strokeWidth="2.5"
      />
      {/* Dog Head */}
      <circle cx="14" cy="8" r="9" fill="#FFAE33" stroke="#121316" strokeWidth="2.5" />
      {/* Floppy Ear */}
      <path d="M8 4C6 2 2 4 4 10C5 12 8 10 8 6Z" fill="#E67E22" stroke="#121316" strokeWidth="2" />
      {/* Dog Eye & Nose */}
      <circle cx="16" cy="7" r="1.5" fill="#121316" />
      <circle cx="21" cy="9" r="2" fill="#121316" />
      {/* Happy Tongue */}
      <ellipse cx="20" cy="14" rx="2.5" ry="3.5" fill="#FF8BA7" stroke="#121316" strokeWidth="1.2" />
      {/* Wagging Tail with Breeze Sparks */}
      <path d="M30 18C38 16 42 10 38 6" stroke="#121316" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M42 8L46 6" stroke="#121316" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
);

// ============================================================================
// 4 Offerings Data Configuration (Matching offer.png + card.png visual flair)
// ============================================================================
export const OFFER_CARDS = [
  {
    id: '01',
    tag: 'Mobility & Physical Access',
    title: 'Universal Mobility Access',
    desc: 'Fully navigable via eye-tracking, switch controllers, adaptive keys, and mapped wheelchair-friendly community hubs.',
    highlight: 'Accessible Navigation',
    bgHeader: 'bg-[#42B4FC]',
    badgeBg: 'bg-[#FFE600]',
    badgeText: 'text-[#121316]',
    Mascot: WheelchairPersonMascot,
    features: ['Eye-Tracking Compatible', 'Wheelchair Route Maps', 'Switch Key Support'],
  },
  {
    id: '02',
    tag: 'Deaf & Hard-of-Hearing',
    title: 'Sign Language & Live Vision',
    desc: 'Transforms spoken words into dynamic visual sign animations and high-contrast real-time subtitles with zero hardware.',
    highlight: 'Non-Auditory AI',
    bgHeader: 'bg-[#FF7DA7]',
    badgeBg: 'bg-white',
    badgeText: 'text-[#121316]',
    Mascot: DeafHearingSignMascot,
    features: ['Real-Time ASL Signs', 'Instant Subtitles', 'Muted Audio AI Mode'],
  },
  {
    id: '03',
    tag: 'Vision & Speech AI',
    title: 'Tactile & Audio Narration',
    desc: 'Deep computer vision reads facial expressions, visual cues, and room surroundings into rich, natural conversational audio.',
    highlight: 'Audio Visual Bridge',
    bgHeader: 'bg-[#6366F1]',
    badgeBg: 'bg-[#FFE600]',
    badgeText: 'text-[#121316]',
    Mascot: VisionAudioMascot,
    features: ['Facial Cue Narration', 'Spatial Audio Ripples', 'Haptic Screen Feedback'],
  },
  {
    id: '04',
    tag: 'Safe Community & Care',
    title: 'Safe & Verified Buddy Up',
    desc: 'Connect with like-minded peers, specialized caregivers, and verified groups with end-to-end privacy and parental safeguards.',
    highlight: 'Verified Safety',
    bgHeader: 'bg-[#FFAE33]',
    badgeBg: 'bg-[#38BDF8]',
    badgeText: 'text-white',
    Mascot: CommunityBuddyMascot,
    features: ['Caregiver Bridge Link', 'Verified Community', 'End-to-End Privacy'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

// ============================================================================
// WhatWeOfferCards Component (Separate Small Colored Doodle Box + Other Text Box)
// Row 1: Small Colored Doodle Box LEFT, Other Text Box RIGHT
// Row 2: Other Text Box LEFT, Small Colored Doodle Box RIGHT
// Row 3: Small Colored Doodle Box LEFT, Other Text Box RIGHT
// Row 4: Other Text Box LEFT, Small Colored Doodle Box RIGHT
// ============================================================================
export const WhatWeOfferCards = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      className="flex flex-col gap-5 sm:gap-6 max-w-5xl mx-auto"
    >
      {OFFER_CARDS.map((card, index) => {
        const isEven = index % 2 === 0;
        const { id, tag, title, desc, highlight, bgHeader, badgeBg, badgeText, Mascot, features } = card;

        return (
          <motion.div
            key={id}
            variants={cardVariants}
            className={`flex flex-col ${
              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-stretch gap-4 sm:gap-5`}
          >
            {/* Box 1: Small Colored Box (Contains ONLY the Doodle Mascot - NO text inside!) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className={`w-full md:w-72 shrink-0 flex flex-col justify-between items-center rounded-3xl border-2 border-[#121316] ${bgHeader} p-4 sm:p-5 shadow-[0_8px_0_#121316] cursor-pointer select-none min-w-0 box-border`}
            >
              {/* Corner Step Badge (No Text) */}
              <div className="w-full flex justify-end">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#121316] ${badgeBg} text-xs font-black ${badgeText} shadow-[1.5px_2px_0_#121316]`}
                >
                  {id}
                </span>
              </div>

              {/* The Doodle Mascot in its Portal (Centered Graphic - Zero Text!) */}
              <div className="my-auto py-1 w-full flex items-center justify-center">
                <Mascot />
              </div>

              {/* Bottom Graphic Accent Dots (Zero Text) */}
              <div className="flex items-center gap-1.5 opacity-30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#121316]" />
                <span className="h-1.5 w-5 rounded-full bg-[#121316]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#121316]" />
              </div>
            </motion.div>

            {/* Box 2: Other Box (White Neo-Brutalist Card with Context & Text) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="w-full flex-1 flex flex-col justify-between rounded-3xl border-2 border-[#121316] bg-white p-5 sm:p-6 shadow-[0_8px_0_#121316] cursor-pointer min-w-0 box-border"
            >
              <div className="min-w-0">
                {/* Top Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-full border-2 border-[#121316] bg-[#FFE600] px-3 py-0.5 text-xs font-black uppercase tracking-wider text-[#121316] shadow-[1.5px_2px_0_#121316]">
                      {tag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-stone-700 border border-stone-200">
                      ⚡ {highlight}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-stone-400">
                    Module {id} of 04
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#121316] leading-snug mt-2">
                  {title}
                </h3>

                {/* Description */}
                <p className="font-sans mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {desc}
                </p>
              </div>

              {/* Feature Pills */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">
                  Features:
                </span>
                {features.map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#121316]" />
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default WhatWeOfferCards;
