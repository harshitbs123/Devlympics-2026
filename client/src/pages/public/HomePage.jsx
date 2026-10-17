import React from 'react';
import HeroSection from '../../components/HeroSection';
import { MascotCardTrio } from '../../components/MascotCards';
import WhatWeOfferCards from '../../components/WhatWeOfferCards';
import AssistiveDeckSlider from '../../components/AssistiveDeckSlider';
import FAQSection from '../../components/FAQSection';

const HomePage = () => {
  return (
    <div className="relative overflow-x-clip text-[#121316]">
      {/* 1. Full-Viewport Bold Doodle-Inspired Hero Section */}
      <HeroSection />

      {/* Main Content Sections Below Hero */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-8 sm:px-6">

        {/* Mascot Card Trio with Staggered Entrance & Hover Lift */}
        <div id="how-it-works" className="mt-4 sm:mt-6">
          <MascotCardTrio />
        </div>

        {/* Visual Assistive Experience (Stacked Slide-Up Deck like animate.png & card.png) */}
        <section id="interactive-demo" className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-stone-200/60">
          <AssistiveDeckSlider />
        </section>

        {/* What We Offer / Interactive Assistive Modules Section */}
        <section id="what-we-offer" className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-stone-200/70">
          <div className="mb-6 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-[#121316] bg-[#FFE600] px-3 py-0.5 text-[11px] font-black uppercase text-[#121316] shadow-[1.5px_2px_0_#121316]">
              <span>⚡ What We Offer</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#121316] tracking-tight">
              Interactive Assistive Modules
            </h2>
            <p className="font-sans text-xs sm:text-base text-stone-600 mt-2 max-w-xl mx-auto font-normal leading-relaxed">
              Customized multimodal pipelines adapting to each individual's communication style across mobility, sound, and vision.
            </p>
          </div>

          <WhatWeOfferCards />
        </section>

        {/* Frequently Asked Questions Section (Vibrant Modern TalkBridge FAQ) */}
        <section id="faq" className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-stone-200/70">
          <FAQSection />
        </section>

      </div>
    </div>
  );
};

export default HomePage;
