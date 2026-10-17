import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import useLogout from '../hooks/useLogout';
import { TalkBridgeDoodleLogo } from './Footer';
import { getLenis } from '../utils/lenis';

const Navbar = () => {
  const { isLoggedin, user } = useAuth();
  const { logout, isLoading } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { offset: -70 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', `#${targetId}`);
      }
    } else {
      navigate(`/#${targetId}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between w-full"
      >
        {/* ===================================================================
            LEFT SIDE: Big TalkBridge Brand Logo (Mascot Icon from Footer + Wordmark)
           =================================================================== */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none"
          aria-label="TalkBridge Home"
        >
          {/* Exact Hand-Drawn Mascot Doodle Icon from Footer */}
          <div className="transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
            <TalkBridgeDoodleLogo className="h-10 sm:h-12 w-auto" />
          </div>

          {/* Big Bold Typography */}
          <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#121316] leading-none transition-transform group-hover:scale-[1.02]">
            talk<span className="text-[#2563EB]">bridge</span>
          </span>
        </Link>

        {/* ===================================================================
            RIGHT SIDE: Neatly Spaced Rounded Navigation Boxes (Desktop)
           =================================================================== */}
        <div className="hidden md:flex items-center gap-2 sm:gap-2.5 lg:gap-3">
          
          {/* "What We Offer" Box */}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'what-we-offer')}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-4 py-2 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFE600] hover:shadow-[3px_3.5px_0_#121316] cursor-pointer"
          >
            <span>What We Offer</span>
            <span className="text-xs">⚡</span>
          </button>

          {/* "How It Works" Box */}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className="inline-flex items-center rounded-full border-2 border-[#121316] bg-white px-4 py-2 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-[3px_3.5px_0_#121316] cursor-pointer"
          >
            <span>How It Works</span>
          </button>

          {/* "FAQs" Box */}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'faq')}
            className="inline-flex items-center rounded-full border-2 border-[#121316] bg-white px-4 py-2 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-[3px_3.5px_0_#121316] cursor-pointer"
          >
            <span>FAQs</span>
          </button>

          {/* Small Divider */}
          <span className="h-5 w-px bg-stone-300 mx-0.5" />

          {/* Auth State: Logged In vs Log In / Sign Up Boxes */}
          {isLoggedin ? (
            <div className="flex items-center gap-2">
              <Link
                to="/app"
                className="flex items-center gap-2 rounded-full border-2 border-[#121316] bg-white py-1.5 pl-2 pr-3.5 shadow-[2px_2.5px_0_#121316] hover:bg-stone-50 transition"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE600] text-[11px] font-black text-[#121316]">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span className="max-w-[100px] truncate text-xs font-bold text-[#121316]">
                  {user?.name || 'User'}
                </span>
              </Link>
              <Link
                to="/app"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#FFE600] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all hover:-translate-y-0.5 hover:bg-[#fed700]"
              >
                <span>Launch App</span>
                <span className="text-xs">⚡</span>
              </Link>
              <button
                onClick={logout}
                disabled={isLoading}
                className="rounded-full border-2 border-[#121316] bg-stone-100 px-3.5 py-1.5 text-xs font-bold text-[#121316] transition-all hover:bg-stone-200 shadow-[2px_2px_0_#121316] disabled:opacity-50"
              >
                {isLoading ? '...' : 'Sign out'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Log In Box */}
              <Link
                to="/login"
                className="inline-flex items-center rounded-full border-2 border-[#121316] bg-white px-4 py-2 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-[3px_3.5px_0_#121316]"
              >
                <span>Log In</span>
              </Link>

              {/* Prominent Sign Up Box */}
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-[#121316] px-5 py-2 text-xs font-bold text-[#FFE600] shadow-[2.5px_3px_0_#FFE600] transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-900 active:translate-y-0.5"
              >
                <span>Sign Up</span>
                <span className="text-[#FFE600] text-xs">⚡</span>
              </Link>
            </div>
          )}

        </div>

        {/* ===================================================================
            MOBILE: Hamburger Menu Button
           =================================================================== */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#121316] bg-white text-[#121316] shadow-[2px_2px_0_#121316] hover:bg-stone-50 md:hidden transition active:translate-y-0.5"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </nav>

      {/* ===================================================================
          MOBILE: Responsive Dropdown Menu with Rounded Boxes
         =================================================================== */}
      {mobileMenuOpen && (
        <div className="mt-3 rounded-3xl border-2 border-[#121316] bg-white p-5 shadow-[4px_6px_0_#121316] md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {/* What We Offer Pill */}
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'what-we-offer')}
              className="flex items-center justify-between rounded-2xl border-2 border-[#121316] bg-[#FFE600] px-4 py-2.5 text-xs font-black uppercase text-[#121316] shadow-[2px_2.5px_0_#121316] text-left cursor-pointer"
            >
              <span>⚡ What We Offer</span>
              <span className="text-xs">↓</span>
            </button>

            {/* How It Works Pill */}
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="flex items-center justify-between rounded-2xl border-2 border-[#121316] bg-white px-4 py-2.5 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] hover:bg-stone-50 text-left cursor-pointer"
            >
              <span>How It Works</span>
              <span className="text-stone-400">↓</span>
            </button>

            {/* FAQs Pill */}
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'faq')}
              className="flex items-center justify-between rounded-2xl border-2 border-[#121316] bg-white px-4 py-2.5 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] hover:bg-stone-50 text-left cursor-pointer"
            >
              <span>FAQs</span>
              <span className="text-stone-400">↓</span>
            </button>

            {/* Auth Section */}
            <div className="mt-2 border-t-2 border-stone-100 pt-3">
              {isLoggedin ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/app"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-2xl border-2 border-[#121316] bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 shadow-[2px_2px_0_#121316]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFE600] text-[10px] font-black text-[#121316]">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <span>Logged in as <strong>{user?.name}</strong></span>
                  </Link>
                  <Link
                    to="/app"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-2xl border-2 border-[#121316] bg-[#FFE600] py-2.5 text-center text-xs font-black uppercase text-[#121316] shadow-[2px_2px_0_#121316]"
                  >
                    Launch App ⚡
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-2xl border-2 border-[#121316] bg-stone-100 py-2.5 text-center text-xs font-bold text-[#121316] shadow-[2px_2px_0_#121316]"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2.5">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-2xl border-2 border-[#121316] bg-white py-2.5 text-center text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316]"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-2xl border-2 border-[#121316] bg-[#2563EB] py-2.5 text-center text-xs font-bold text-white shadow-[2px_2.5px_0_#121316]"
                  >
                    Sign Up ⚡
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
