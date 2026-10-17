import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// ============================================================================
// MINIMAL HAND-DRAWN DOODLES (Smart, tasteful accents retained as requested)
// ============================================================================

/**
 * Playful Minimal Speech Bubble Doodle
 */
export const SpeechBubbleDoodle = ({ className = 'h-10 w-12 sm:h-12 sm:w-14' }) => (
  <svg
    viewBox="0 0 72 64"
    className={`${className} select-none drop-shadow-sm`}
    fill="none"
  >
    {/* Speech Bubble Outline */}
    <path
      d="M12 12 C 12 4, 60 4, 60 12 C 60 28, 48 38, 36 38 L 24 50 L 26 38 C 16 38, 12 30, 12 12 Z"
      fill="#FFE600"
      stroke="#121316"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Inside Chat Dots */}
    <circle cx="28" cy="22" r="2.2" fill="#121316" />
    <circle cx="36" cy="22" r="2.2" fill="#121316" />
    <circle cx="44" cy="22" r="2.2" fill="#121316" />
  </svg>
);

/**
 * Hand-Drawn Scribble Arrow Doodle pointing gracefully towards the questions
 */
export const HandDrawnArrowDoodle = ({ className = 'h-8 w-14 sm:h-9 sm:w-16' }) => (
  <svg
    viewBox="0 0 80 50"
    className={`${className} select-none text-[#121316]`}
    fill="none"
  >
    <path
      d="M8 32 C 22 42, 46 44, 64 24"
      stroke="#121316"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M52 20 L 66 22 L 60 34"
      stroke="#121316"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 4-Point Retro Twinkling Star Doodle
 */
export const StarDoodle = ({ color = '#FFE600', size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="select-none"
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

/**
 * Hand-Drawn Mini Heart / Community Doodle
 */
export const HeartDoodle = ({ size = 20 }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 24 22" fill="none" className="select-none">
    <path
      d="M12 20C12 20 2 13.5 2 7.5C2 4.5 4.5 2 7.5 2C9.5 2 11 3 12 4.5C13 3 14.5 2 16.5 2C19.5 2 22 4.5 22 7.5C22 13.5 12 20 12 20Z"
      fill="#FF7AA2"
      stroke="#121316"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// 6 STRAIGHT FAQ QUESTIONS (Clean, unified list with no category labels)
// ============================================================================
const FAQ_ITEMS = [
  {
    id: '01',
    question: 'What exactly is TalkBridge?',
    answer:
      'TalkBridge is an accessibility-focused video calling platform designed to help people communicate without language or communication barriers. It brings video calls, live captions, language translation, and alternative ways to respond into one connected experience.',
  },
  {
    id: '02',
    question: 'How does live language translation work?',
    answer:
      "TalkBridge is designed to convert spoken conversations into text, translate them into a participant's preferred language, and display readable captions during a call. The experience depends on the languages and speech services supported by the implementation.",
  },
  {
    id: '03',
    question: 'Can deaf or hard-of-hearing users use TalkBridge?',
    answer:
      'Absolutely. TalkBridge aims to make conversations more accessible with live captions, speaker identification, and visual indicators for speech. Users can follow conversations through text rather than relying entirely on audio.',
  },
  {
    id: '04',
    question: "What if I can't or don't want to speak?",
    answer:
      'No problem. TalkBridge is designed to support text-based replies, with optional text-to-speech so typed messages can be spoken aloud. This gives participants another way to join the conversation comfortably.',
  },
  {
    id: '05',
    question: 'Does TalkBridge support sign language?',
    answer:
      'Sign-language recognition is an experimental direction for TalkBridge. The prototype may explore recognizing a limited set of signs and converting them into text or speech. Full sign-language translation is a much larger challenge, so support will depend on the features actually implemented.',
  },
  {
    id: '06',
    question: 'Is TalkBridge just another video calling app?',
    answer:
      'Not quite. The goal is to make video calls adapt to the people using them. Rather than expecting everyone to communicate in the same way, TalkBridge aims to bring different languages, communication preferences, and accessibility needs together in one experience.',
  },
];

export const FAQSection = () => {
  // Allow only one answer open at a time; first item open by default
  const [openId, setOpenId] = useState('01');

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-4 sm:px-6">
      
      {/* =====================================================================
          1. CLEAR HEADING ABOVE THE FAQ BOX
         ===================================================================== */}
      <div className="relative text-center mb-8 sm:mb-12">
        {/* Eyebrow Pill + Floating Star Accent */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: PREMIUM_EASE }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#FFE600] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#121316] shadow-[1.5px_2px_0_#121316]">
            <span>⚡ GOT QUESTIONS?</span>
          </div>

          <motion.div
            animate={{ rotate: [0, 15, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none"
          >
            <StarDoodle color="#FFE600" size={20} />
          </motion.div>
        </motion.div>

        {/* Main Heading: "Frequently Asked Questions" */}
        <div className="relative inline-block max-w-2xl mx-auto">
          {/* Floating Minimal Speech Bubble Doodle (Retained top-right) */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -top-8 -right-10 sm:-right-14 hidden sm:block select-none"
          >
            <SpeechBubbleDoodle />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: PREMIUM_EASE }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#121316] tracking-tight leading-[1.15]"
          >
            Frequently Asked{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Questions
              </span>
              <span className="absolute -bottom-1 left-0 -z-0 h-3 w-full rounded-md bg-[#FFE600]/80 -rotate-1" />
            </span>
          </motion.h2>
        </div>

        {/* Short Subtitle with Mini Heart Doodle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: PREMIUM_EASE }}
          className="mt-3 flex items-center justify-center gap-2"
        >
          <p className="font-sans text-sm sm:text-base text-stone-600 font-normal">
            Everything you need to know.
          </p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none"
          >
            <HeartDoodle size={18} />
          </motion.div>
        </motion.div>

        {/* Hand-Drawn Arrow Doodle pointing toward the FAQ Box */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-2 hidden sm:flex items-center justify-center text-stone-400"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none rotate-90"
          >
            <HandDrawnArrowDoodle className="h-6 w-12" />
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================================
          2. THE FAQ BOX: Clean, Minimalist Accordion with 6 Straight Questions
         ===================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease: PREMIUM_EASE }}
        className="relative overflow-hidden rounded-[2rem] border-2 border-[#121316] bg-white p-4 sm:p-7 shadow-[0_10px_0_#121316] transition-all"
      >
        {/* Subtle Decorative Ambient Corners (Minimalist) */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br from-amber-200/30 via-rose-200/20 to-transparent blur-xl" />
        <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gradient-to-tr from-blue-100/30 via-yellow-100/20 to-transparent blur-xl" />

        <div className="relative z-10 divide-y divide-stone-100">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const questionId = `faq-question-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className="py-4 sm:py-5 first:pt-1 last:pb-1 transition-colors duration-200"
              >
                {/* Accordion Row Header / Button */}
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl px-2.5 py-1.5 -mx-2.5 hover:bg-stone-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {/* Question Number Badge */}
                    <span
                      className={`text-xs sm:text-sm font-black transition-colors shrink-0 ${
                        isOpen ? 'text-[#2563EB]' : 'text-stone-400 group-hover:text-blue-600'
                      }`}
                    >
                      {item.id}
                    </span>

                    {/* Question Title Text */}
                    <span
                      className={`font-display text-sm sm:text-base md:text-lg font-bold leading-snug transition-colors break-words ${
                        isOpen ? 'text-[#121316]' : 'text-stone-800 group-hover:text-blue-600'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Circular Plus/Minus Toggle Pill Button (Coral/Pink matching reference) */}
                  <div
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border transition-all duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-[#121316] text-[#FFE600] border-[#121316] shadow-sm rotate-45'
                        : 'bg-[#FFE4E6] text-[#E11D48] border-[#FECDD3] group-hover:bg-[#FCE7F3] group-hover:scale-105'
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </button>

                {/* Expandable Answer Panel with Natural Dynamic Height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={questionId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: PREMIUM_EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2.5 pb-2 pl-7 sm:pl-9 pr-3 sm:pr-8">
                        <p className="font-sans text-xs sm:text-sm md:text-[14.5px] text-stone-600 leading-relaxed font-normal">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* =====================================================================
          3. MINIMAL CALL-TO-ACTION ROW
         ===================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: PREMIUM_EASE }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center"
      >
        <span className="text-xs sm:text-sm font-medium text-stone-600">
          Still have questions? We're here to help.
        </span>
        <div className="flex items-center gap-2">
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#2563EB] px-4 py-1.5 text-xs font-bold text-white shadow-[2px_2.5px_0_#121316] transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <span>Try Live Demo</span>
            <span className="text-[#FFE600]">⚡</span>
          </Link>
          <a
            href="mailto:support@talkbridge.org"
            className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 shadow-sm transition hover:border-[#121316] hover:bg-stone-50"
          >
            <span>Contact Us</span>
            <span className="text-stone-400">↗</span>
          </a>
        </div>
      </motion.div>

    </div>
  );
};

export default FAQSection;
