import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { isLoggedin, user } = useAuth();
  const { logout, isLoading } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080907]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <span className="brand-mark h-6 w-6" />
          <span className="font-display text-lg font-bold tracking-tight text-[#f6f4ed]">
            Devlympics <span className="text-[#d2e815]">2026</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? 'text-[#d2e815]' : 'text-[#f6f4ed]/70 hover:text-[#f6f4ed]'
              }`
            }
          >
            Home
          </NavLink>
          <a
            href="#about"
            className="text-sm font-medium text-[#f6f4ed]/70 transition hover:text-[#f6f4ed]"
          >
            Bridge The Gap
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-[#f6f4ed]/70 transition hover:text-[#f6f4ed]"
          >
            Features
          </a>
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedin ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d2e815] text-xs font-bold text-[#111214]">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span className="max-w-[130px] truncate text-xs font-semibold text-[#f6f4ed]">
                  {user?.name || user?.email || 'User'}
                </span>
              </div>
              <button
                onClick={logout}
                disabled={isLoading}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-[#f6f4ed]/80 transition hover:bg-white/10 hover:text-[#f6f4ed] disabled:opacity-50"
              >
                {isLoading ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg px-3.5 py-1.5 text-sm font-semibold text-[#f6f4ed]/80 transition hover:text-[#f6f4ed]"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-[#d2e815] px-4 py-1.5 text-sm font-bold text-[#111214] transition hover:bg-[#c2d80b]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#f6f4ed] md:hidden"
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
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#0c0d0a] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#f6f4ed]/80 hover:text-[#d2e815]"
            >
              Home
            </Link>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#f6f4ed]/80 hover:text-[#d2e815]"
            >
              Bridge The Gap
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#f6f4ed]/80 hover:text-[#d2e815]"
            >
              Features
            </a>

            <div className="mt-2 border-t border-white/10 pt-3">
              {isLoggedin ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-[#f6f4ed]/60">
                    Signed in as <span className="font-semibold text-[#f6f4ed]">{user?.name || user?.email}</span>
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    disabled={isLoading}
                    className="w-full rounded-lg border border-white/15 py-2 text-center text-xs font-semibold text-[#f6f4ed]"
                  >
                    {isLoading ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-lg border border-white/10 py-2 text-center text-sm font-semibold text-[#f6f4ed]"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-lg bg-[#d2e815] py-2 text-center text-sm font-bold text-[#111214]"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
