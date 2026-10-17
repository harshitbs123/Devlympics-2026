import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { isLoggedin, user } = useAuth();
  const { logout, isLoading } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-black/[0.08] bg-white/80 px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-200"
      >
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5 pl-1.5 focus:outline-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#121316] text-[#FFE600] transition group-hover:scale-105">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          <span className="font-display text-sm font-extrabold tracking-tight text-[#121316]">
            Omni<span className="text-amber-500">Bridge</span>
          </span>
        </Link>

        {/* Center Desktop Links */}
        <div className="hidden items-center gap-6 text-xs font-semibold text-stone-600 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-black ${isActive ? 'text-black font-bold' : ''}`
            }
          >
            Overview
          </NavLink>
          <a href="#how-it-works" className="transition hover:text-black">
            How It Works
          </a>
          <a href="#solutions" className="transition hover:text-black">
            Solutions
          </a>
          <a href="#tech" className="transition hover:text-black">
            Tech Stack
          </a>
        </div>

        {/* Right CTA / Auth Status */}
        <div className="hidden items-center gap-2.5 md:flex">
          {isLoggedin ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 py-1 pl-1 pr-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE600] text-[11px] font-extrabold text-[#121316]">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span className="max-w-[100px] truncate text-xs font-semibold text-stone-800">
                  {user?.name || 'User'}
                </span>
              </div>
              <button
                onClick={logout}
                disabled={isLoading}
                className="rounded-full border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-black disabled:opacity-50"
              >
                {isLoading ? '...' : 'Sign out'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:text-black"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1.5 rounded-full bg-[#121316] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-stone-800 hover:scale-105 active:scale-95"
              >
                Try for free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-stone-700 hover:bg-stone-100 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-sm rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-xl backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-2.5 text-sm font-semibold text-stone-700">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Overview
            </Link>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              How It Works
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Solutions
            </a>
            <a
              href="#tech"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Tech Stack
            </a>
            <div className="mt-2 border-t border-stone-100 pt-3">
              {isLoggedin ? (
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-stone-500">
                    Logged in as <strong>{user?.name}</strong>
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-full border border-stone-200 py-1.5 text-center text-xs font-semibold text-stone-700"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-full border border-stone-200 py-2 text-center text-xs font-semibold text-stone-700"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-full bg-[#121316] py-2 text-center text-xs font-bold text-white"
                  >
                    Try for free
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
