import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import WhatWeOfferCards from '../../components/WhatWeOfferCards';
import AssistiveDeckSlider from '../../components/AssistiveDeckSlider';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const WhatWeOfferPage = () => {
  return (
    <div className="relative min-h-screen text-[#121316]">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        
        {/* Header: Interactive Assistive Modules (Kept cleanly with everything above removed) */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-[#121316] bg-[#FFE600] px-3 py-0.5 text-[11px] font-black uppercase text-[#121316] shadow-[1.5px_2px_0_#121316]">
              <span>⚡ What We Offer</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-[#121316] tracking-tight">
              Interactive Assistive Modules
            </h1>
            <p className="font-sans text-xs sm:text-base text-stone-600 mt-2 max-w-xl font-normal leading-relaxed">
              Customized multimodal pipelines adapting to each individual's communication style across mobility, sound, and vision.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-5 py-2.5 text-xs font-bold text-[#121316] shadow-[2px_3px_0_#121316] transition hover:bg-stone-50"
          >
            <span>← Back to Overview</span>
          </Link>
        </div>

        {/* The 4 Alternating Assistive Module Boxes */}
        <WhatWeOfferCards />

        {/* Visual Assistive Experience (Stacked Slide-Up Deck like animate.png & card.png) */}
        <div className="mt-24 sm:mt-28 pt-14 sm:pt-16 border-t border-stone-200/60">
          <AssistiveDeckSlider />
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="mt-20 sm:mt-24 rounded-[2.5rem] border-2 border-[#121316] bg-[#FFE600] p-8 text-center shadow-[6px_6px_0_#121316] sm:p-12"
        >
          <div className="mx-auto max-w-2xl">
            <span className="inline-block rounded-full border-2 border-[#121316] bg-white px-3.5 py-1 text-xs font-black uppercase text-[#121316]">
              ⚡ Get Started in 30 Seconds
            </span>
            <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-[#121316] sm:text-4xl">
              Ready to Bridge The Gap?
            </h2>
            <p className="font-sans mx-auto mt-3 max-w-xl text-sm font-medium text-stone-800 leading-relaxed">
              No extra sensors or expensive gear required. OmniBridge runs directly inside any standard web browser using your webcam and microphone.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#121316] bg-[#121316] px-7 py-3 text-sm font-bold text-white shadow-[3px_3px_0_#FFE600] transition-all hover:-translate-y-0.5 hover:shadow-[4px_5px_0_#FFE600]"
              >
                <span>Launch Live Bridge</span>
                <span className="text-[#FFE600]">⚡</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-7 py-3 text-sm font-bold text-[#121316] shadow-[2px_3px_0_#121316] transition hover:bg-stone-50"
              >
                <span>Explore Live Demos</span>
                <span className="text-stone-400">↗</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default WhatWeOfferPage;
