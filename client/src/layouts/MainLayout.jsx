import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F4] text-[#121316] overflow-x-hidden">
      {/* 1. Seamless Golden Amber Arch (extending from the very top of the window) */}
      <div className="hero-ambient-arch pointer-events-none fixed inset-x-0 top-0 h-[560px] w-full z-0" />

      {/* 2. Unified Background Perspective Grid */}
      <div className="hero-grid-bg pointer-events-none fixed inset-0 opacity-70 z-0" />

      {/* 3. Sun-dappled Leaf Shadow Simulation */}
      <div className="sun-dappled-overlay pointer-events-none fixed inset-0 z-0" />

      {/* 4. Floating Navbar Header (Seamlessly overlaying the unified background) */}
      <div className="relative z-50 w-full pt-4 sm:pt-5 pb-2">
        <Navbar />
      </div>

      {/* 5. Main Route Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
