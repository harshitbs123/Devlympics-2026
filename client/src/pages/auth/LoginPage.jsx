import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import useLogin from '../../hooks/useLogin';
import { useAuth } from '../../context/auth/AuthContext';
import { HandIcon, AlertTriangleIcon, ArrowRightIcon, SparklesIcon } from '../../components/ui/Icons';

const PREMIUM_EASE = [0.16, 1, 0.3, 1];

const LoginPage = () => {
  const { isLoggedin } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { login, isLoading, error } = useLogin();

  if (isLoggedin) {
    return <Navigate to="/app" replace />;
  }

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10 overflow-hidden text-[#121316]">
      
      {/* Background Floating Sparkle Doodle Left */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-8 top-16 hidden lg:block select-none"
      >
        <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
          <path d="M20 4L22 16L34 18L22 20L20 32L18 20L6 18L18 16Z" fill="#FFE600" stroke="#121316" strokeWidth="2" />
          <path d="M30 6L31 10L35 11L31 12L30 16L29 12L25 11L29 10Z" fill="#FF7AA2" stroke="#121316" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Background Floating Curly Squiggle Right */}
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="pointer-events-none absolute right-10 top-20 hidden lg:block select-none"
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

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
        className="relative z-10 w-full max-w-md rounded-3xl border-2 border-[#121316] bg-white p-7 sm:p-10 shadow-[6px_8px_0_#121316]"
      >
        {/* Brand Icon & Badge */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 rounded-full border-2 border-[#121316] bg-[#121316] px-3.5 py-1.5 text-xs font-bold text-[#FFE600] shadow-[2px_2px_0_#FFE600] transition hover:scale-105"
            aria-label="Back to home"
          >
            <HandIcon className="w-4 h-4 text-[#FFE600]" />
            <span className="text-white">Omni<span className="text-amber-400">Bridge</span></span>
          </Link>

          <motion.div
            whileHover={{ scale: 1.06, rotate: 0 }}
            className="inline-flex select-none items-center gap-1.5 rounded-xl border-2 border-[#121316] bg-[#FFE600] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#121316] shadow-[2px_2px_0_#121316] rotate-[-2deg]"
          >
            <span>⚡ Secure Sign In</span>
          </motion.div>
        </div>

        {/* Hand-drawn rays \ | / */}
        <div className="mb-1 text-[#121316]">
          <svg className="h-3.5 w-10" viewBox="0 0 48 16" fill="none">
            <path d="M12 14L4 4" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M24 14L24 2" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M36 14L44 4" stroke="#121316" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#121316]">
          Welcome{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10 text-[#121316]">back</span>
            <span className="absolute -bottom-1 left-0 -z-0 h-3 w-full origin-left rounded-md bg-[#FFE600]/80" style={{ transform: 'rotate(-0.5deg)' }} />
          </span>
        </h1>
        <p className="font-sans mt-1.5 mb-6 text-xs font-medium text-stone-600 leading-relaxed">
          Sign in to access your customized assistive workspaces and translation models.
        </p>

        {error && (
          <div className="mb-5 flex items-center gap-2.5 rounded-2xl border-2 border-rose-300 bg-rose-50 p-3.5 text-xs font-bold text-rose-800 shadow-[2px_2px_0_#fecdd3]">
            <AlertTriangleIcon className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-sans mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/70 px-4 py-3 text-sm font-semibold text-[#121316] placeholder-stone-400 outline-none transition focus:border-[#121316] focus:bg-white focus:shadow-[2px_2px_0_#FFE600]"
            />
          </div>

          <div>
            <label className="font-sans mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border-2 border-stone-200 bg-stone-50/70 px-4 py-3 text-sm font-semibold text-[#121316] placeholder-stone-400 outline-none transition focus:border-[#121316] focus:bg-white focus:shadow-[2px_2px_0_#FFE600]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2, boxShadow: '4px 6px 0px #FFE600' }}
            whileTap={{ scale: 0.98, y: 1 }}
            type="submit"
            disabled={isLoading}
            className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#121316] bg-[#121316] py-3 text-sm font-extrabold text-white shadow-[3px_4px_0_#FFE600] transition hover:bg-stone-900 disabled:opacity-50"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
            <ArrowRightIcon className="w-4 h-4 text-[#FFE600]" />
          </motion.button>
        </form>

        <p className="font-sans mt-7 text-center text-xs font-semibold text-stone-500">
          Don't have an account yet?{' '}
          <Link
            to="/signup"
            className="font-bold text-[#121316] underline decoration-[#FFE600] decoration-2 underline-offset-4 hover:text-black transition"
          >
            Create an Accessible Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
