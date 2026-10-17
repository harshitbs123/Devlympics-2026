import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

const HomePage = () => {
  const { isLoggedin, user } = useAuth();

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      {/* Background Subtle Glow */}
      <div className="pointer-events-none absolute h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(210,232,21,0.08)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        {/* Pill Tag */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d2e815]/20 bg-[#d2e815]/10 px-4 py-1.5 text-xs font-semibold text-[#d2e815]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d2e815] animate-pulse" />
          Devlympics — Shunya 2026 • Problem Statement #3
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl text-[#f6f4ed]">
          Bridge the <span className="text-[#d2e815]">Gap</span>
        </h1>

        {/* Description */}
        <p className="font-sans mt-5 text-base sm:text-lg text-[#f6f4ed]/70 leading-relaxed max-w-2xl mx-auto">
          Transforming barriers into shared experiences. Connect disconnected worlds across technical expertise, physical ability, language, and accessibility.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {isLoggedin ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-[#f6f4ed]">
              👋 Welcome back, <strong className="text-[#d2e815]">{user?.name}</strong>! You are authenticated and ready to build.
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="rounded-xl bg-[#d2e815] px-6 py-3 text-sm font-bold text-[#111214] shadow-lg shadow-[#d2e815]/20 transition hover:bg-[#c2d80b] hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-[#f6f4ed] transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Minimal Feature Blueprint Placeholder */}
        <div id="features" className="mt-16 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-2 text-xl font-bold text-[#d2e815]">01</div>
            <h3 className="font-semibold text-[#f6f4ed]">Authentication</h3>
            <p className="mt-1 text-xs text-[#f6f4ed]/60">
              JWT cookie-based authentication with bcrypt password hashing and Joi validation.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-2 text-xl font-bold text-[#d2e815]">02</div>
            <h3 className="font-semibold text-[#f6f4ed]">Minimal Navbar</h3>
            <p className="mt-1 text-xs text-[#f6f4ed]/60">
              Responsive navigation bar with live auth status and logout support.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-2 text-xl font-bold text-[#d2e815]">03</div>
            <h3 className="font-semibold text-[#f6f4ed]">Ready to Build</h3>
            <p className="mt-1 text-xs text-[#f6f4ed]/60">
              Clean foundation ready for your assistive or AI bridge implementation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
