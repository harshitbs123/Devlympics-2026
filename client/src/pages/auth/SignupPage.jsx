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
    <div className="relative flex min-h-[calc(100vh-100px)] items-center justify-center px-4 py-8">
      <div className="relative z-10 w-full max-w-sm rounded-[2rem] border-2 border-[#121316] bg-white p-7 shadow-[6px_6px_0_#121316] sm:p-9">
        <div className="mb-4 flex justify-center">
          <Link
            to="/"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#121316] bg-[#FFE600] shadow-[2px_2px_0_#121316] transition hover:scale-105"
          >
            <span className="text-xl">✌️</span>
          </Link>
        </div>

        <h2 className="font-display text-center text-2xl font-black tracking-tight text-[#121316]">
          Create Account
        </h2>
        <p className="font-sans mb-6 text-center text-xs font-medium text-stone-500">
          Join OmniBridge • Devlympics 2026
        </p>

        {error && (
          <div className="mb-4 rounded-xl border-2 border-red-500 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="font-sans mb-1 block text-xs font-bold text-stone-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-[#121316] bg-stone-50 px-3.5 py-2.5 text-sm font-medium text-[#121316] placeholder-stone-400 outline-none transition focus:bg-white focus:shadow-[2px_2px_0_#121316]"
            />
            {formErrors.nameErr && (
              <p className="mt-1 text-[11px] font-bold text-red-500">{formErrors.nameErr}</p>
            )}
          </div>

          <div>
            <label className="font-sans mb-1 block text-xs font-bold text-stone-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-[#121316] bg-stone-50 px-3.5 py-2.5 text-sm font-medium text-[#121316] placeholder-stone-400 outline-none transition focus:bg-white focus:shadow-[2px_2px_0_#121316]"
            />
            {formErrors.emailErr && (
              <p className="mt-1 text-[11px] font-bold text-red-500">{formErrors.emailErr}</p>
            )}
          </div>

          <div>
            <label className="font-sans mb-1 block text-xs font-bold text-stone-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-[#121316] bg-stone-50 px-3.5 py-2.5 text-sm font-medium text-[#121316] placeholder-stone-400 outline-none transition focus:bg-white focus:shadow-[2px_2px_0_#121316]"
            />
            {formErrors.passwordErr && (
              <p className="mt-1 text-[11px] font-bold text-red-500">{formErrors.passwordErr}</p>
            )}
          </div>

          <div>
            <label className="font-sans mb-1 block text-xs font-bold text-stone-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-[#121316] bg-stone-50 px-3.5 py-2.5 text-sm font-medium text-[#121316] placeholder-stone-400 outline-none transition focus:bg-white focus:shadow-[2px_2px_0_#121316]"
            />
            {formErrors.confirmPasswordErr && (
              <p className="mt-1 text-[11px] font-bold text-red-500">{formErrors.confirmPasswordErr}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex min-h-11 w-full items-center justify-center rounded-full border-2 border-[#121316] bg-[#FFE600] py-2.5 text-sm font-black text-[#121316] shadow-[3px_3px_0_#121316] transition hover:bg-amber-300 hover:shadow-[1px_1px_0_#121316] active:translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up ✦'}
          </button>
        </form>

        <p className="font-sans mt-6 text-center text-xs font-medium text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#121316] underline decoration-[#FFE600] decoration-2">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
