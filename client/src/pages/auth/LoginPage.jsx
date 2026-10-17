import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { useAuth } from '../../context/auth/AuthContext';

const LoginPage = () => {
  const { isLoggedin } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { login, isLoading, error } = useLogin();

  if (isLoggedin) {
    return <Navigate to="/" replace />;
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
    <div className="relative flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-12">
      {/* Background Glow */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(210,232,21,0.1)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#0b0c0a]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-5 flex justify-center">
          <Link
            to="/"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d2e815]/20 bg-[#d2e815]/10 shadow-lg shadow-[#d2e815]/10 transition hover:scale-105"
          >
            <span className="brand-mark h-6 w-6" />
          </Link>
        </div>

        <h2 className="font-display text-center text-2xl font-extrabold tracking-tight text-[#f6f4ed]">
          Welcome Back
        </h2>
        <p className="font-sans mb-6 text-center text-xs text-[#f6f4ed]/60">
          Sign in to your Devlympics account
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/25 bg-red-950/40 p-3 text-center text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-sans mb-1.5 block text-xs font-semibold text-[#f6f4ed]/75">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-[#f6f4ed] placeholder-white/30 outline-none transition focus:border-[#d2e815]/50 focus:ring-1 focus:ring-[#d2e815]/30"
            />
          </div>

          <div>
            <label className="font-sans mb-1.5 block text-xs font-semibold text-[#f6f4ed]/75">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-[#f6f4ed] placeholder-white/30 outline-none transition focus:border-[#d2e815]/50 focus:ring-1 focus:ring-[#d2e815]/30"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#d2e815] py-2.5 text-sm font-bold text-[#111214] shadow-md transition hover:bg-[#c2d80b] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="font-sans mt-6 text-center text-xs text-[#f6f4ed]/60">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-[#d2e815] transition hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
