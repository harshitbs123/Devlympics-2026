import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import { validateForm } from '../../utils/authValidation';
import { useAuth } from '../../context/auth/AuthContext';

const SignupPage = () => {
  const { isLoggedin } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const { signup, isLoading, error } = useSignup();

  if (isLoggedin) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedData);

    const errors = validateForm(updatedData);
    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    const { confirmPassword: _confirmPassword, ...payload } = formData;
    await signup(payload);
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
          Create Account
        </h2>
        <p className="font-sans mb-6 text-center text-xs text-[#f6f4ed]/60">
          Join Devlympics 2026
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/25 bg-red-950/40 p-3 text-center text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="font-sans mb-1 block text-xs font-semibold text-[#f6f4ed]/75">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-[#f6f4ed] placeholder-white/30 outline-none transition focus:border-[#d2e815]/50 focus:ring-1 focus:ring-[#d2e815]/30"
            />
            {formErrors.nameErr && (
              <p className="mt-1 text-[11px] text-red-400">{formErrors.nameErr}</p>
            )}
          </div>

          <div>
            <label className="font-sans mb-1 block text-xs font-semibold text-[#f6f4ed]/75">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-[#f6f4ed] placeholder-white/30 outline-none transition focus:border-[#d2e815]/50 focus:ring-1 focus:ring-[#d2e815]/30"
            />
            {formErrors.emailErr && (
              <p className="mt-1 text-[11px] text-red-400">{formErrors.emailErr}</p>
            )}
          </div>

          <div>
            <label className="font-sans mb-1 block text-xs font-semibold text-[#f6f4ed]/75">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-[#f6f4ed] placeholder-white/30 outline-none transition focus:border-[#d2e815]/50 focus:ring-1 focus:ring-[#d2e815]/30"
            />
            {formErrors.passwordErr && (
              <p className="mt-1 text-[11px] text-red-400">{formErrors.passwordErr}</p>
            )}
          </div>

          <div>
            <label className="font-sans mb-1 block text-xs font-semibold text-[#f6f4ed]/75">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-[#f6f4ed] placeholder-white/30 outline-none transition focus:border-[#d2e815]/50 focus:ring-1 focus:ring-[#d2e815]/30"
            />
            {formErrors.confirmPasswordErr && (
              <p className="mt-1 text-[11px] text-red-400">{formErrors.confirmPasswordErr}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex min-h-11 w-full items-center justify-center rounded-xl bg-[#d2e815] py-2.5 text-sm font-bold text-[#111214] shadow-md transition hover:bg-[#c2d80b] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="font-sans mt-6 text-center text-xs text-[#f6f4ed]/60">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#d2e815] transition hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
