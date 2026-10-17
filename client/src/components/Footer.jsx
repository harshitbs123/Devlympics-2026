import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

// ============================================================================
// UNIQUE TALKBRIDGE DOODLE ICON & BRAND SIGNATURE
// Inspired by the Maxima reference: Two cute overlapping speech bubbles with
// tiny expressive faces, symbolizing people connecting across communication barriers.
// ============================================================================
export const TalkBridgeDoodleLogo = ({ className = 'h-16 sm:h-20' }) => (
  <svg
    viewBox="0 0 170 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none overflow-visible`}
    aria-label="TalkBridge Doodle Mascot Logo"
  >
    {/* Left Character (Electric Blue Speech Bubble) */}
    <g className="transition-transform duration-300 hover:-translate-y-1">
      {/* Playful Hair Bun on Top */}
      <circle
        cx="44"
        cy="22"
        r="9"
        fill="#2563EB"
        stroke="#121316"
        strokeWidth="2.6"
      />
      
      {/* Speech Bubble Head/Body */}
      <path
        d="M 20 50 C 20 32, 38 24, 60 24 C 82 24, 94 36, 94 56 C 94 72, 80 82, 62 82 C 54 82, 46 90, 36 96 C 38 88, 38 84, 35 82 C 24 76, 20 65, 20 50 Z"
        fill="#2563EB"
        stroke="#121316"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Joyful Smiling Eyes */}
      <path
        d="M 43 49 Q 48 43 53 49"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M 63 49 Q 68 43 73 49"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Sweet Blushing Cheeks */}
      <ellipse cx="40" cy="57" rx="4.5" ry="3" fill="#FF7AA2" opacity="0.9" />
      <ellipse cx="76" cy="57" rx="4.5" ry="3" fill="#FF7AA2" opacity="0.9" />

      {/* Happy Little Smile */}
      <path
        d="M 53 58 Q 58 65 63 58"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </g>

    {/* Connecting Bridge Arc with Dotted Line (Symbolizing Translation & Connection) */}
    <path
      d="M 85 52 Q 98 42 110 52"
      stroke="#121316"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeDasharray="2.5 3.5"
    />

    {/* Tiny Yellow Sparkle Star floating between bubbles */}
    <g className="transition-transform duration-300 hover:rotate-12">
      <path
        d="M 98 32 L 100 37 L 105 38 L 101 42 L 102 47 L 98 44 L 94 47 L 95 42 L 91 38 L 96 37 Z"
        fill="#FFE600"
        stroke="#121316"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </g>

    {/* Right Character (Warm Coral Speech Bubble, Overlapping) */}
    <g className="transition-transform duration-300 hover:-translate-y-1">
      {/* Cute Yellow Doodle Cap / Tuft */}
      <path
        d="M 108 26 Q 120 18 132 26 Q 140 28 144 31"
        stroke="#121316"
        strokeWidth="2.6"
        fill="#FFE600"
        strokeLinejoin="round"
      />

      {/* Speech Bubble Head/Body */}
      <path
        d="M 96 58 C 96 40, 110 30, 128 30 C 146 30, 158 40, 158 58 C 158 74, 144 84, 130 84 C 122 84, 114 92, 108 98 C 110 90, 109 86, 106 84 C 98 79, 96 68, 96 58 Z"
        fill="#FF6B4A"
        stroke="#121316"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Expressive Curious Eyes Looking at the Blue Bubble */}
      <circle cx="116" cy="54" r="3.2" fill="#FFFFFF" />
      <circle cx="115" cy="54" r="1.6" fill="#121316" />

      <circle cx="134" cy="54" r="3.2" fill="#FFFFFF" />
      <circle cx="133" cy="54" r="1.6" fill="#121316" />

      {/* Rosy Cheeks */}
      <ellipse cx="110" cy="62" rx="4" ry="2.5" fill="#FFE600" opacity="0.9" />
      <ellipse cx="140" cy="62" rx="4" ry="2.5" fill="#FFE600" opacity="0.9" />

      {/* Open Grin */}
      <path
        d="M 120 62 Q 125 70 130 62"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

// ============================================================================
// SUBTLE HAND-DRAWN DOODLES FOR FOOTER ACCENTS
// ============================================================================

/** Tiny Hand-Drawn Twinkling Star */
const DoodleStar = ({ color = '#FFE600', size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`${className} select-none`}
  >
    <path
      d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9Z"
      fill={color}
      stroke="#121316"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

/** Tiny Hand-Drawn Heart */
const DoodleHeart = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size * 0.9}
    viewBox="0 0 24 22"
    fill="none"
    className={`${className} select-none`}
  >
    <path
      d="M12 20C12 20 2 13.5 2 7.5C2 4.5 4.5 2 7.5 2C9.5 2 11 3 12 4.5C13 3 14.5 2 16.5 2C19.5 2 22 4.5 22 7.5C22 13.5 12 20 12 20Z"
      fill="#FF7AA2"
      stroke="#121316"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

/** Subtle Hand-Drawn Connecting Scribble Line */
const DoodleConnectingLine = () => (
  <svg
    viewBox="0 0 120 24"
    className="h-4 w-28 text-stone-300 select-none opacity-60"
    fill="none"
  >
    <path
      d="M4 12 C 24 4, 44 20, 64 12 C 84 4, 100 18, 116 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="3 4"
    />
  </svg>
);

// ============================================================================
// MAIN TALKBRIDGE FOOTER COMPONENT
// ============================================================================
export const Footer = () => {
  return (
    <footer className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-12 pt-6">
      {/* Clean White Card Container matching reference layout & website theme */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#121316] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_12px_0_#121316] transition-all">
        
        {/* Subtle Ambient Decorative Gradient in Corner */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-blue-100/40 via-amber-100/30 to-rose-100/20 blur-2xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-tr from-yellow-100/40 via-rose-100/30 to-transparent blur-xl" />

        {/* ===================================================================
            TOP SECTION: Essential Navigation Links (Left) & Social/CTA (Right)
           =================================================================== */}
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between pb-10 sm:pb-12 border-b-2 border-stone-100">
          
          {/* Navigation Links (Organized cleanly in 2 columns as in reference) */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {/* Column 1: Core Product & Overview */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="font-display text-xs font-black uppercase tracking-wider text-stone-400">
                  Platform
                </span>
                <DoodleStar size={12} color="#FFE600" />
              </div>
              <ul className="flex flex-col gap-2.5 text-sm sm:text-base font-bold text-[#121316]">
                <li>
                  <Link
                    to="/"
                    className="inline-block transition-transform hover:translate-x-1 hover:text-[#2563EB]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#what-we-offer"
                    className="inline-block transition-transform hover:translate-x-1 hover:text-[#2563EB]"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#how-it-works"
                    className="inline-block transition-transform hover:translate-x-1 hover:text-[#2563EB]"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources & Support */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="font-display text-xs font-black uppercase tracking-wider text-stone-400">
                  Resources
                </span>
                <DoodleStar size={12} color="#FF7AA2" />
              </div>
              <ul className="flex flex-col gap-2.5 text-sm sm:text-base font-bold text-[#121316]">
                <li>
                  <Link
                    to="/#faq"
                    className="inline-block transition-transform hover:translate-x-1 hover:text-[#2563EB]"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@talkbridge.org"
                    className="inline-block transition-transform hover:translate-x-1 hover:text-[#2563EB]"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-transform hover:translate-x-1 hover:text-[#2563EB]"
                  >
                    <span>Open Source</span>
                    <span className="text-xs text-stone-400">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Social Pills & Primary "Get Started" Pill Button */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 self-start md:self-auto">
            
            {/* Social Circle Pills in Soft Pastel Tints (Matching Reference: in, ig, fb) */}
            <div className="flex items-center gap-2.5">
              {/* GitHub Pill */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-[#F3F4F6] text-[#121316] transition-all hover:-translate-y-0.5 hover:bg-[#FFE600] hover:border-[#121316] shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* Twitter / X Pill */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-[#EFF6FF] text-[#2563EB] transition-all hover:-translate-y-0.5 hover:bg-[#DBEAFE] hover:border-blue-400 shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn Pill (Rose/Lavender tone matching reference) */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 bg-[#FFE4E6] text-[#E11D48] transition-all hover:-translate-y-0.5 hover:bg-[#FECDD3] hover:border-rose-400 shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            {/* Vibrant Pill Button ("Get started" from Reference Image) */}
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#121316] bg-[#2563EB] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[2.5px_3px_0_#121316] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[3.5px_4px_0_#121316] active:translate-y-0.5"
            >
              <span>Get started</span>
              <span className="text-[#FFE600] font-black">⚡</span>
            </Link>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM SECTION: TalkBridge Doodle Mascot Signature + Legal Info
            (Directly inspired by Maxima's large wordmark & character heads)
           =================================================================== */}
        <div className="relative z-10 pt-8 sm:pt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          {/* Bottom Left: TalkBridge Doodle Logo & Bold Brand Signature */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            
            {/* The Unique TalkBridge Overlapping Speech Bubbles Mascot */}
            <motion.div
              whileHover={{ scale: 1.04, rotate: -1.5 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              className="cursor-pointer"
            >
              <TalkBridgeDoodleLogo className="h-16 sm:h-20" />
            </motion.div>

            {/* Bold Brand Name & Tagline */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#121316] select-none leading-none">
                  talk<span className="text-[#2563EB]">bridge</span>
                </span>
                
                {/* Floating Gentle Heart Doodle */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none self-start"
                >
                  <DoodleHeart size={16} />
                </motion.div>
              </div>

              {/* Tagline Requested by User */}
              <p className="mt-2 font-sans text-xs sm:text-sm font-bold text-stone-500 max-w-sm leading-relaxed">
                Different ways to communicate. One bridge to connect.
              </p>
            </div>
          </div>

          {/* Bottom Right: Copyright & Essential Legal Links (Matching Maxima Reference) */}
          <div className="flex flex-col items-start lg:items-end gap-1.5 text-xs text-stone-500 font-medium">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link to="/faq" className="hover:text-[#121316] transition-colors">
                Terms & Conditions
              </Link>
              <span className="text-stone-300">•</span>
              <Link to="/faq" className="hover:text-[#121316] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-stone-300">•</span>
              <Link to="/what-we-offer" className="hover:text-[#121316] transition-colors">
                Accessibility Statement
              </Link>
            </div>

            {/* Copyright Line */}
            <p className="text-[11px] sm:text-xs text-stone-400 mt-1">
              2026 © TalkBridge. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
