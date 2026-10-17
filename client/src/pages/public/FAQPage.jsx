import React from 'react';
import { Link } from 'react-router-dom';
import FAQSection from '../../components/FAQSection';

export const FAQPage = () => {
  return (
    <div className="relative min-h-screen text-[#121316]">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-4 py-2 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] transition hover:bg-stone-50"
          >
            <span>← Back to Overview</span>
          </Link>

          <Link
            to="/what-we-offer"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#FFE600] px-4 py-2 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] transition hover:bg-[#fed700]"
          >
            <span>What We Offer ⚡</span>
          </Link>
        </div>

        {/* The Full Vibrant FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};

export default FAQPage;
