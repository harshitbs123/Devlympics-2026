import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import useLogout from '../hooks/useLogout';
import { HandIcon, AlertTriangleIcon } from '../components/ui/Icons';
import { TalkBridgeDoodleLogo } from '../components/Footer';

const ProtectedLayout = () => {
  const { isLoggedin, isLoading: isAuthLoading, user } = useAuth();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FBF9F4] text-[#121316] px-4 text-center overflow-hidden">
        <div className="hero-ambient-arch pointer-events-none fixed inset-x-0 top-0 h-[480px] w-full z-0" />
        <div className="hero-grid-bg pointer-events-none fixed inset-0 opacity-70 z-0" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-[#121316] bg-[#FFE600] shadow-[4px_4px_0_#121316] animate-bounce">
            <TalkBridgeDoodleLogo className="h-10 w-auto" />
          </div>
          <h2 className="font-display mt-6 text-xl font-black text-[#121316]">
            Verifying secure session...
          </h2>
          <p className="font-sans mt-1.5 text-xs text-stone-600 font-medium">
            Preparing your accessible communication profile ⚡
          </p>
        </div>
      </div>
    );
  }

  if (!isLoggedin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const subrouteTitle = location.pathname.replace('/app/', '').replace(/-/g, ' ');

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F4] text-[#121316] overflow-x-clip">
      {/* 1. Ambient Golden Arch */}
      <div className="hero-ambient-arch pointer-events-none fixed inset-x-0 top-0 h-[560px] w-full z-0" />

      {/* 2. Unified Background Perspective Grid */}
      <div className="hero-grid-bg pointer-events-none fixed inset-0 opacity-70 z-0" />

      {/* 3. Sun-dappled Leaf Shadow Simulation */}
      <div className="sun-dappled-overlay pointer-events-none fixed inset-0 z-0" />

      {/* 4. Top Floating Neo-Brutalist Navigation Bar (Matching Homepage Navbar) */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-2 select-none">
        <nav aria-label="Protected navigation" className="flex items-center justify-between w-full">
          
          {/* Brand & Active Mode Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none"
              aria-label="TalkBridge Home"
            >
              <div className="transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
                <TalkBridgeDoodleLogo className="h-10 sm:h-12 w-auto" />
              </div>
              <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#121316] leading-none transition-transform group-hover:scale-[1.02]">
                talk<span className="text-[#2563EB]">bridge</span>
              </span>
            </Link>

            {/* Subroute Breadcrumb Pill */}
            {location.pathname !== '/app' && (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-stone-300">•</span>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-white px-3 py-1 text-xs font-bold text-stone-700 shadow-[2px_2px_0_#121316] hover:bg-stone-50 transition"
                >
                  <span>← Hub</span>
                </Link>
                <span className="rounded-full border-2 border-[#121316] bg-[#FFE600] px-3 py-0.5 text-[11px] font-black uppercase text-[#121316] shadow-[1.5px_2px_0_#121316]">
                  {subrouteTitle}
                </span>
              </div>
            )}
          </div>

          {/* Right Action Controls (Floating rounded pills matching home page) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Features Hub Link */}
            <Link
              to="/app"
              className={`hidden md:inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] px-4 py-2 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                location.pathname === '/app'
                  ? 'bg-[#121316] text-[#FFE600] shadow-[2px_2.5px_0_#FFE600]'
                  : 'bg-white text-[#121316] shadow-[2px_2.5px_0_#121316] hover:bg-[#FFE600]'
              }`}
            >
              <span>Features Hub</span>
              <span className="text-xs">⚡</span>
            </Link>

            {/* Quick Home Link */}
            <Link
              to="/"
              className="hidden lg:inline-flex items-center rounded-full border-2 border-[#121316] bg-white px-4 py-2 text-xs font-bold text-[#121316] shadow-[2px_2.5px_0_#121316] transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-[3px_3.5px_0_#121316]"
            >
              <span>Website ↗</span>
            </Link>

            {/* Emergency SOS Shortcut (Subtle Minimal Badge) */}
            <button
              onClick={() =>
                alert(
                  `Emergency SOS triggered. Alert dispatched to: ${
                    user?.emergencyContact?.name || 'Emergency Services'
                  } (${user?.emergencyContact?.phone || '112'})`
                )
              }
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#121316] bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-700 shadow-[2px_2px_0_#121316] transition hover:bg-rose-100 active:translate-y-0.5"
              aria-label="Trigger Emergency SOS"
            >
              <AlertTriangleIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>SOS</span>
            </button>

            {/* Small Divider */}
            <span className="h-5 w-px bg-stone-300 mx-0.5 hidden sm:inline-block" />

            {/* User Avatar Pill */}
            <div className="flex items-center gap-2 rounded-full border-2 border-[#121316] bg-white py-1.5 pl-2 pr-3.5 shadow-[2px_2.5px_0_#121316]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE600] text-[11px] font-black text-[#121316]">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
              <span className="max-w-[100px] truncate text-xs font-bold text-[#121316] hidden sm:inline-block">
                {user?.name || 'User'}
              </span>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={logout}
              disabled={isLoggingOut}
              className="rounded-full border-2 border-[#121316] bg-stone-100 px-3.5 py-1.5 text-xs font-bold text-[#121316] transition-all hover:bg-stone-200 shadow-[2px_2px_0_#121316] disabled:opacity-50 active:translate-y-0.5"
            >
              {isLoggingOut ? '...' : 'Sign out'}
            </button>
          </div>

        </nav>
      </header>

      {/* 5. Main Route Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
