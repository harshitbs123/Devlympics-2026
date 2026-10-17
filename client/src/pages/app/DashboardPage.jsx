import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/auth/AuthContext';
import {
  HandIcon,
  MicIcon,
  LayoutGridIcon,
  GlobeIcon,
  ArrowRightIcon,
  SlidersIcon,
  CheckIcon,
} from '../../components/ui/Icons';

const SparkleDoodle = ({ color = '#FFE600', size = 20, className = '' }) => (
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

const FEATURES = [
  {
    id: 'sign_to_text',
    num: '01',
    title: 'Sign Language to Text & Voice',
    path: '/app/sign-to-text',
    icon: HandIcon,
    tagline: 'Dual-Way Vision Bridge',
    description:
      'Continuous 21-point hand tracking converting signs into real-time text and synthesized speech in English and Hindi.',
    badge: 'Ready to Launch',
    actionText: 'Launch Workspace',
    cardBg: 'bg-[#F0F9FF]',
    iconBg: 'bg-[#E0F2FE] text-[#0369A1]',
    pillDot: 'bg-[#0284C7]',
    tagPill: 'Vision & Hands',
  },
  {
    id: 'speech_to_sign',
    num: '02',
    title: 'Speech to Visual Sign Language',
    path: '/app/speech-to-sign',
    icon: MicIcon,
    tagline: 'Acoustic Decoder',
    description:
      'Captures spoken dialogue from hearing partners and renders live animated sign illustrations and visual cues.',
    badge: 'Interactive Beta',
    actionText: 'Open Speech Decoder',
    cardBg: 'bg-[#FFFBEB]',
    iconBg: 'bg-[#FEF3C7] text-[#B45309]',
    pillDot: 'bg-[#D97706]',
    tagPill: 'Speech & Audio',
  },
  {
    id: 'aac_board',
    num: '03',
    title: 'Visual AAC Symbol Board',
    path: '/app/aac-board',
    icon: LayoutGridIcon,
    tagline: 'Assistive Communication',
    description:
      'High-contrast visual pictograms and communication tiles for non-verbal users with instant voice playback.',
    badge: 'Interactive Beta',
    actionText: 'Open Symbol Board',
    cardBg: 'bg-[#FFF1F2]',
    iconBg: 'bg-[#FCE7F3] text-[#BE185D]',
    pillDot: 'bg-[#DB2777]',
    tagPill: 'Visual AAC Grid',
  },
  {
    id: 'multilingual_translator',
    num: '04',
    title: 'Two-Way Multilingual Voice Bridge',
    path: '/app/multilingual-translator',
    icon: GlobeIcon,
    tagline: 'Dual-Way Voice & Text',
    description:
      'Live bidirectional conversation translator supporting 15+ Indian and global languages with hands-free voice input and auto-speech output.',
    badge: 'Ready to Launch',
    actionText: 'Open Live Translator',
    cardBg: 'bg-[#ECFDF5]',
    iconBg: 'bg-[#D1FAE5] text-[#047857]',
    pillDot: 'bg-[#059669]',
    tagPill: 'Multilingual Core',
  },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const [selectedLang, setSelectedLang] = useState(user?.preferredLanguage === 'hi' ? 'hi' : 'en');

  return (
    <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-6xl mx-auto w-full select-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col"
      >
        {/* Header Greeting & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b-2 border-[#121316]/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-3.5 py-1 text-xs font-bold text-[#121316] shadow-[2px_2px_0_#121316]">
              <span>⚡ Workspace Dashboard</span>
            </div>

            <h1 className="font-display mt-3 text-3xl sm:text-4xl font-black tracking-tight text-[#121316]">
              Welcome,{' '}
              <span className="relative inline-block">
                <span className="relative z-10">{user?.name || 'Friend'}</span>
                <span className="absolute -bottom-1 left-0 -z-0 h-3 w-full bg-[#FFE600] rounded-sm -rotate-1 pointer-events-none" />
              </span>
            </h1>

            <p className="font-sans mt-1.5 text-xs sm:text-sm text-stone-600 font-medium max-w-xl leading-relaxed">
              Select an assistive communication workspace below. Each feature operates in its own dedicated, clutter-free environment.
            </p>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Mode:</span>
            <div className="flex rounded-full border-2 border-[#121316] bg-white p-0.5 shadow-[2px_2px_0_#121316]">
              <button
                type="button"
                onClick={() => setSelectedLang('en')}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                  selectedLang === 'en'
                    ? 'bg-[#121316] text-[#FFE600]'
                    : 'text-stone-600 hover:text-black'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setSelectedLang('hi')}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                  selectedLang === 'hi'
                    ? 'bg-[#121316] text-[#FFE600]'
                    : 'text-stone-600 hover:text-black'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>
        </div>

        {/* Feature Options Catalog Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SparkleDoodle color="#FFE600" size={18} />
              <h2 className="font-display text-base sm:text-lg font-black uppercase tracking-tight text-[#121316]">
                Available Workspaces
              </h2>
            </div>
            <span className="rounded-full border-2 border-[#121316] bg-white px-3 py-0.5 text-xs font-bold text-[#121316] shadow-[1.5px_1.5px_0_#121316]">
              4 Modules Ready ⚡
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {FEATURES.map((feature) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-[#121316] ${feature.cardBg} p-6 shadow-[3px_4px_0_#121316] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_6px_0_#121316]`}
                >
                  {/* Top Badge & Number */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316]/20 bg-white/85 px-3 py-1 text-xs font-bold text-stone-700 shadow-sm backdrop-blur-xs">
                        <span className={`h-2 w-2 rounded-full ${feature.pillDot}`} />
                        <span>{feature.tagPill}</span>
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#121316] bg-[#FFE600] text-xs font-black text-[#121316] shadow-[1.5px_1.5px_0_#121316]">
                        {feature.num}
                      </span>
                    </div>

                    {/* Feature Icon & Title */}
                    <div className="my-5 flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#121316] ${feature.iconBg} shadow-[2px_2px_0_#121316]`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block mb-0.5">
                          {feature.tagline}
                        </span>
                        <h3 className="font-display text-xl font-black text-[#121316] leading-snug">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mb-6">
                      {feature.description}
                    </p>
                  </div>

                  {/* Route Link Button */}
                  <div>
                    <Link
                      to={feature.path}
                      className="flex items-center justify-between w-full rounded-full border-2 border-[#121316] bg-[#121316] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2.5px_0_#121316] transition-all hover:bg-stone-800 hover:text-[#FFE600] active:translate-y-0.5"
                    >
                      <span>{feature.actionText}</span>
                      <ArrowRightIcon className="w-4 h-4 text-[#FFE600] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Calibration Snapshot Card */}
        <div className="mt-8 rounded-3xl border-2 border-[#121316] bg-[#FFFDF0] p-5 sm:p-6 shadow-[3px_4px_0_#121316]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#121316] bg-[#FFE600] text-[#121316] shadow-[2px_2px_0_#121316]">
                <SlidersIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-sm font-black text-[#121316]">
                  Calibrated for {user?.disability ? user.disability.replace(/_/g, ' ') : 'General Accessibility'}
                </h4>
                <p className="font-sans text-xs text-stone-500 font-medium mt-0.5">
                  Primary Dialect: <strong>{user?.signDialect || 'ISL'}</strong> • Preferred Language: <strong>{selectedLang === 'hi' ? 'हिंदी (Hindi)' : 'English'}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 rounded-full px-3.5 py-1">
              <CheckIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>Subsystems Active ⚡</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
