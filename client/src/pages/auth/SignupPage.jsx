import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import useSignup from '../../hooks/useSignup';
import { validateForm } from '../../utils/authValidation';
import { useAuth } from '../../context/auth/AuthContext';
import {
  EarIcon,
  MicOffIcon,
  HandIcon,
  EyeIcon,
  UsersIcon,
  SettingsIcon,
  MicIcon,
  MessageSquareIcon,
  AlertTriangleIcon,
  GlobeIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  SlidersIcon,
} from '../../components/ui/Icons';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const DISABILITY_OPTIONS = [
  {
    id: 'deaf_hard_of_hearing',
    label: 'Deaf / Hard of Hearing',
    icon: EarIcon,
    desc: 'Communicates primarily via sign language or visual captions',
  },
  {
    id: 'speech_impaired',
    label: 'Non-Verbal / Speech Impaired',
    icon: MicOffIcon,
    desc: 'Relies on gestures, text-to-speech, or AAC symbols',
  },
  {
    id: 'motor_impaired',
    label: 'Motor / Limited Mobility',
    icon: HandIcon,
    desc: 'Sensitive camera tracking with relaxed gesture thresholds',
  },
  {
    id: 'low_vision',
    label: 'Low Vision / Screen Reader',
    icon: EyeIcon,
    desc: 'High-contrast typography and audible speech playback',
  },
  {
    id: 'none_ally',
    label: 'Hearing Ally / Doctor / Educator',
    icon: UsersIcon,
    desc: 'Collaborating with deaf or speech-impaired peers and patients',
  },
  {
    id: 'other',
    label: 'Custom Assistive Profile',
    icon: SettingsIcon,
    desc: 'Customizable interface options and input sensitivity',
  },
];

const COMMUNICATION_MODES = [
  {
    id: 'sign_language',
    label: 'Sign Language to Voice & Text',
    subtitle: 'Dual-Way Vision Bridge',
    icon: HandIcon,
  },
  {
    id: 'spoken_voice',
    label: 'Spoken Voice to Visual Signs',
    subtitle: 'Acoustic Dialogue Decoder',
    icon: MicIcon,
  },
  {
    id: 'text_captions',
    label: 'Visual AAC & Communication Board',
    subtitle: 'Non-Verbal Touch Playback',
    icon: MessageSquareIcon,
  },
];

const SIGN_DIALECTS = [
  { id: 'ISL', label: 'ISL — Indian Sign Language' },
  { id: 'ASL', label: 'ASL — American Sign Language' },
  { id: 'BSL', label: 'BSL — British Sign Language' },
  { id: 'IS', label: 'International Sign (IS)' },
];

const SignupPage = () => {
  const { isLoggedin } = useAuth();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    disability: 'deaf_hard_of_hearing',
    primaryCommunication: 'sign_language',
    preferredLanguage: 'en',
    signDialect: 'ISL',
    assistivePreferences: {
      highContrast: false,
      largeCaptions: false,
      hapticAlerts: true,
    },
    emergencyContact: {
      name: '',
      phone: '',
    },
  });

  const [formErrors, setFormErrors] = useState({});
  const { signup, isLoading, error } = useSignup();

  if (isLoggedin) {
    return <Navigate to="/app" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('assistivePreferences.')) {
      const prefKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        assistivePreferences: {
          ...prev.assistivePreferences,
          [prefKey]: checked,
        },
      }));
      return;
    }

    if (name.startsWith('emergencyContact.')) {
      const contactKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [contactKey]: value,
        },
      }));
      return;
    }

    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFormData(updatedData);

    const errors = validateForm(updatedData);
    setFormErrors(errors);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      const errors = validateForm(formData);
      if (errors.nameErr || errors.emailErr || errors.passwordErr || errors.confirmPasswordErr) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword: _confirmPassword, ...payload } = formData;
    await signup(payload);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10 sm:py-14 overflow-hidden text-[#121316]">
      
      {/* Decorative Doodles Matching Home Page */}
      {/* Floating Sparkle Doodle Left */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-6 top-16 hidden lg:block select-none"
      >
        <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
          <path d="M20 4L22 16L34 18L22 20L20 32L18 20L6 18L18 16Z" fill="#FFE600" stroke="#121316" strokeWidth="2" />
          <path d="M30 6L31 10L35 11L31 12L30 16L29 12L25 11L29 10Z" fill="#FF7AA2" stroke="#121316" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Floating Curly Squiggle Doodle Right */}
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="pointer-events-none absolute right-8 top-20 hidden lg:block select-none"
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

      {/* Main Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: PREMIUM_EASE }}
        className="relative z-10 w-full max-w-xl rounded-3xl border-2 border-[#121316] bg-white p-6 sm:p-10 shadow-[6px_8px_0_#121316]"
      >
        
        {/* Top Header Section */}
        <div className="mb-7">
          
          {/* Top Row: Back to Home + Tilted Yellow Sticker */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group flex items-center gap-2 rounded-full border-2 border-[#121316] bg-[#121316] px-3.5 py-1.5 text-xs font-bold text-[#FFE600] shadow-[2px_2px_0_#FFE600] transition hover:scale-105"
              aria-label="Return to OmniBridge Home"
            >
              <HandIcon className="w-4 h-4 text-[#FFE600]" />
              <span className="text-white">Omni<span className="text-amber-400">Bridge</span></span>
            </Link>

            {/* Tilted Sticker Badge */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex select-none items-center gap-1.5 rounded-xl border-2 border-[#121316] bg-[#FFE600] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#121316] shadow-[2px_2px_0_#121316] rotate-[-2deg]"
            >
              <span>⚡ Free & Accessible</span>
            </motion.div>
          </div>

          {/* Heading with Home Page Yellow Marker Highlight */}
          <div className="mt-5">
            {/* Hand-drawn rays \ | / */}
            <div className="mb-1 text-[#121316]">
              <svg className="h-3.5 w-10" viewBox="0 0 48 16" fill="none">
                <path d="M12 14L4 4" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M24 14L24 2" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M36 14L44 4" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#121316]">
              {step === 1 && (
                <>
                  Create your{' '}
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10 text-[#121316]">account</span>
                    <span className="absolute -bottom-1 left-0 -z-0 h-3 w-full origin-left rounded-md bg-[#FFE600]/80" style={{ transform: 'rotate(-0.5deg)' }} />
                  </span>
                </>
              )}
              {step === 2 && (
                <>
                  Your{' '}
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10 text-[#121316]">accessibility profile</span>
                    <span className="absolute -bottom-1 left-0 -z-0 h-3 w-full origin-left rounded-md bg-[#FFE600]/80" style={{ transform: 'rotate(-0.5deg)' }} />
                  </span>
                </>
              )}
              {step === 3 && (
                <>
                  Language &{' '}
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10 text-[#121316]">safety settings</span>
                    <span className="absolute -bottom-1 left-0 -z-0 h-3 w-full origin-left rounded-md bg-[#FFE600]/80" style={{ transform: 'rotate(-0.5deg)' }} />
                  </span>
                </>
              )}
            </h1>

            <p className="font-sans mt-1.5 text-xs text-stone-600 font-medium leading-relaxed">
              {step === 1 && 'Set up your credentials to access personalized assistive translation workspaces.'}
              {step === 2 && 'Calibrate the engine to tailor camera tracking and translation to your exact needs.'}
              {step === 3 && 'Pick your preferred sign dialect, language, and optional emergency alert dispatch.'}
            </p>
          </div>

          {/* Luxury 3-Stage Stepper Pills */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { num: 1, title: 'Credentials' },
              { num: 2, title: 'Accessibility' },
              { num: 3, title: 'Language' },
            ].map((s) => {
              const isCurrent = step === s.num;
              const isPast = step > s.num;
              return (
                <div
                  key={s.num}
                  className={`flex items-center justify-center gap-1.5 rounded-full py-1.5 px-2 text-xs transition-all ${
                    isCurrent
                      ? 'border-2 border-[#121316] bg-[#FFE600] font-black text-[#121316] shadow-[2px_2px_0_#121316]'
                      : isPast
                      ? 'border-2 border-stone-200 bg-stone-100 font-bold text-stone-800'
                      : 'border border-stone-200 bg-white font-medium text-stone-400'
                  }`}
                >
                  {isPast ? (
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="font-mono text-[10px]">{s.num}.</span>
                  )}
                  <span className="truncate">{s.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-2xl border-2 border-rose-300 bg-rose-50 p-3.5 text-xs font-bold text-rose-800 shadow-[2px_2px_0_#fecdd3]">
            <AlertTriangleIcon className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={step === 3 ? handleSubmit : handleNextStep}>
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Account Credentials */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="font-sans mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/70 px-4 py-3 text-sm font-semibold text-[#121316] placeholder-stone-400 outline-none transition focus:border-[#121316] focus:bg-white focus:shadow-[2px_2px_0_#FFE600]"
                    required
                  />
                  {formErrors.nameErr && (
                    <p className="mt-1 text-[11px] font-bold text-rose-600">{formErrors.nameErr}</p>
                  )}
                </div>

                <div>
                  <label className="font-sans mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/70 px-4 py-3 text-sm font-semibold text-[#121316] placeholder-stone-400 outline-none transition focus:border-[#121316] focus:bg-white focus:shadow-[2px_2px_0_#FFE600]"
                    required
                  />
                  {formErrors.emailErr && (
                    <p className="mt-1 text-[11px] font-bold text-rose-600">{formErrors.emailErr}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/70 px-4 py-3 text-sm font-semibold text-[#121316] placeholder-stone-400 outline-none transition focus:border-[#121316] focus:bg-white focus:shadow-[2px_2px_0_#FFE600]"
                      required
                    />
                    {formErrors.passwordErr && (
                      <p className="mt-1 text-[11px] font-bold text-rose-600">{formErrors.passwordErr}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-sans mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/70 px-4 py-3 text-sm font-semibold text-[#121316] placeholder-stone-400 outline-none transition focus:border-[#121316] focus:bg-white focus:shadow-[2px_2px_0_#FFE600]"
                      required
                    />
                    {formErrors.confirmPasswordErr && (
                      <p className="mt-1 text-[11px] font-bold text-rose-600">{formErrors.confirmPasswordErr}</p>
                    )}
                  </div>
                </div>

                {/* Continue CTA */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2, boxShadow: '4px 6px 0px #FFE600' }}
                  whileTap={{ scale: 0.98, y: 1 }}
                  type="submit"
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#121316] bg-[#121316] py-3 text-sm font-extrabold text-white shadow-[3px_4px_0_#FFE600] transition hover:bg-stone-900"
                >
                  <span>Continue to Accessibility Profile</span>
                  <ArrowRightIcon className="w-4 h-4 text-[#FFE600]" />
                </motion.button>
              </motion.div>
            )}

            {/* STEP 2: Accessibility Profile */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="font-sans text-xs font-bold uppercase tracking-wider text-stone-700">
                      Select Your Communication Profile:
                    </label>
                    <span className="text-[11px] font-mono text-stone-400">Step 2 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DISABILITY_OPTIONS.map((opt) => {
                      const IconComponent = opt.icon;
                      const isSelected = formData.disability === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setFormData((prev) => ({ ...prev, disability: opt.id }))}
                          className={`group flex flex-col justify-between rounded-2xl border-2 p-3.5 text-left transition-all ${
                            isSelected
                              ? 'border-[#121316] bg-[#121316] text-white shadow-[3px_3px_0_#FFE600]'
                              : 'border-stone-200 bg-stone-50/60 hover:border-black hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                                isSelected
                                  ? 'border-[#FFE600] bg-[#FFE600] text-[#121316]'
                                  : 'border-stone-300 bg-white text-stone-700 group-hover:border-black'
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </span>

                            {isSelected && (
                              <span className="flex items-center gap-1 rounded-full bg-[#FFE600] px-2 py-0.5 text-[10px] font-black uppercase text-[#121316]">
                                <CheckIcon className="w-3 h-3 text-[#121316]" />
                                <span>Active</span>
                              </span>
                            )}
                          </div>

                          <div className="mt-3">
                            <span className={`font-display text-xs font-bold block ${isSelected ? 'text-white' : 'text-[#121316]'}`}>
                              {opt.label}
                            </span>
                            <p className={`mt-0.5 text-[11px] leading-tight ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Communication Channel */}
                <div>
                  <label className="font-sans mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Preferred Assistant Mode:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {COMMUNICATION_MODES.map((mode) => {
                      const IconComponent = mode.icon;
                      const isSelected = formData.primaryCommunication === mode.id;
                      return (
                        <button
                          type="button"
                          key={mode.id}
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, primaryCommunication: mode.id }))
                          }
                          className={`flex items-center justify-between rounded-2xl border-2 p-3.5 text-left transition ${
                            isSelected
                              ? 'border-[#121316] bg-[#121316] text-white shadow-[3px_3px_0_#FFE600]'
                              : 'border-stone-200 bg-stone-50/60 hover:border-black hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                                isSelected
                                  ? 'border-[#FFE600] bg-[#FFE600] text-[#121316]'
                                  : 'border-stone-300 bg-white text-stone-700'
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </span>
                            <div>
                              <span className={`font-display text-xs font-bold block ${isSelected ? 'text-white' : 'text-[#121316]'}`}>
                                {mode.label}
                              </span>
                              <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                                {mode.subtitle}
                              </span>
                            </div>
                          </div>

                          {isSelected && <CheckIcon className="w-4 h-4 text-[#FFE600]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-2.5 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex min-h-12 items-center justify-center gap-1.5 flex-1 rounded-full border-2 border-stone-300 bg-white py-3 text-xs font-extrabold text-stone-800 shadow-[2px_2px_0_#e5e5e5] hover:border-black transition"
                  >
                    <ArrowLeftIcon className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2, boxShadow: '4px 6px 0px #FFE600' }}
                    whileTap={{ scale: 0.98, y: 1 }}
                    type="submit"
                    className="flex min-h-12 items-center justify-center gap-2 flex-[2] rounded-full border-2 border-[#121316] bg-[#121316] py-3 text-xs font-extrabold text-white shadow-[3px_4px_0_#FFE600] transition hover:bg-stone-900"
                  >
                    <span>Next: Dialect & Safety</span>
                    <ArrowRightIcon className="w-4 h-4 text-[#FFE600]" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Language & Emergency SOS */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {/* Sign Dialect Selector */}
                <div>
                  <label className="font-sans mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
                    <HandIcon className="w-3.5 h-3.5 text-stone-500" />
                    <span>Sign Language Dialect</span>
                  </label>
                  <select
                    name="signDialect"
                    value={formData.signDialect}
                    onChange={handleChange}
                    className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/70 px-4 py-3 text-xs font-bold text-[#121316] outline-none focus:border-[#121316] focus:bg-white"
                  >
                    {SIGN_DIALECTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Translation Language Toggle: English / Hindi Only */}
                <div>
                  <label className="font-sans mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
                    <GlobeIcon className="w-3.5 h-3.5 text-stone-500" />
                    <span>Spoken Translation Language</span>
                  </label>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, preferredLanguage: 'en' }))}
                      className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-3 px-4 text-xs font-bold transition ${
                        formData.preferredLanguage === 'en'
                          ? 'border-[#121316] bg-[#121316] text-[#FFE600] shadow-[3px_3px_0_#FFE600]'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-black'
                      }`}
                    >
                      <span className="font-extrabold">English</span>
                      {formData.preferredLanguage === 'en' && <CheckIcon className="w-3.5 h-3.5 text-[#FFE600]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, preferredLanguage: 'hi' }))}
                      className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-3 px-4 text-xs font-bold transition ${
                        formData.preferredLanguage === 'hi'
                          ? 'border-[#121316] bg-[#121316] text-[#FFE600] shadow-[3px_3px_0_#FFE600]'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-black'
                      }`}
                    >
                      <span className="font-extrabold">हिंदी (Hindi)</span>
                      {formData.preferredLanguage === 'hi' && <CheckIcon className="w-3.5 h-3.5 text-[#FFE600]" />}
                    </button>
                  </div>
                </div>

                {/* Assistive UI Preferences */}
                <div className="rounded-2xl border-2 border-stone-200 bg-stone-50/70 p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <SlidersIcon className="w-3.5 h-3.5 text-stone-700" />
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-stone-800">
                      Accessibility Adjustments
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-stone-800 bg-white p-2.5 rounded-xl border border-stone-200 hover:border-black transition">
                      <span>High Contrast Visual Palette</span>
                      <input
                        type="checkbox"
                        name="assistivePreferences.highContrast"
                        checked={formData.assistivePreferences.highContrast}
                        onChange={handleChange}
                        className="h-4 w-4 rounded accent-[#121316] cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-stone-800 bg-white p-2.5 rounded-xl border border-stone-200 hover:border-black transition">
                      <span>Large Text & Dynamic Subtitles</span>
                      <input
                        type="checkbox"
                        name="assistivePreferences.largeCaptions"
                        checked={formData.assistivePreferences.largeCaptions}
                        onChange={handleChange}
                        className="h-4 w-4 rounded accent-[#121316] cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-stone-800 bg-white p-2.5 rounded-xl border border-stone-200 hover:border-black transition">
                      <span>Visual Flash Cue for Audio Dialogue</span>
                      <input
                        type="checkbox"
                        name="assistivePreferences.hapticAlerts"
                        checked={formData.assistivePreferences.hapticAlerts}
                        onChange={handleChange}
                        className="h-4 w-4 rounded accent-[#121316] cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Emergency SOS Contact */}
                <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-600" />
                      <span>Emergency SOS Shortcut (Optional)</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-amber-700">One-Tap Alert</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="emergencyContact.name"
                      placeholder="Caregiver or Ally Name"
                      value={formData.emergencyContact.name}
                      onChange={handleChange}
                      className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-[#121316] outline-none focus:border-black"
                    />
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      placeholder="Emergency Contact Phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleChange}
                      className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-[#121316] outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Submit Row */}
                <div className="flex gap-2.5 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex min-h-12 items-center justify-center gap-1.5 flex-1 rounded-full border-2 border-stone-300 bg-white py-3 text-xs font-extrabold text-stone-800 shadow-[2px_2px_0_#e5e5e5] hover:border-black transition"
                  >
                    <ArrowLeftIcon className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2, boxShadow: '4px 6px 0px #FFE600' }}
                    whileTap={{ scale: 0.98, y: 1 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex min-h-12 items-center justify-center gap-2 flex-[2] rounded-full border-2 border-[#121316] bg-[#121316] py-3 text-xs font-extrabold text-white shadow-[3px_4px_0_#FFE600] transition hover:bg-stone-900 disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Creating Profile...' : 'Complete & Open Bridge'}</span>
                    <SparklesIcon className="w-4 h-4 text-[#FFE600]" />
                  </motion.button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </form>

        {/* Footer Login Redirect */}
        <p className="font-sans mt-7 text-center text-xs font-semibold text-stone-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#121316] underline decoration-[#FFE600] decoration-2 underline-offset-4 hover:text-black transition"
          >
            Sign In Here
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default SignupPage;
