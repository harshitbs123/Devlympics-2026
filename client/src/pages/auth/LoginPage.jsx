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
          Welcome Back
        </h2>
        <p className="font-sans mb-6 text-center text-xs font-medium text-stone-500">
          Sign in to your OmniBridge account
        </p>

        {error && (
          <div className="mb-4 rounded-xl border-2 border-red-500 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-sans mb-1.5 block text-xs font-bold text-stone-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 border-[#121316] bg-stone-50 px-3.5 py-2.5 text-sm font-medium text-[#121316] placeholder-stone-400 outline-none transition focus:bg-white focus:shadow-[2px_2px_0_#121316]"
            />
          </div>

          <div>
            <label className="font-sans mb-1.5 block text-xs font-bold text-stone-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 border-[#121316] bg-stone-50 px-3.5 py-2.5 text-sm font-medium text-[#121316] placeholder-stone-400 outline-none transition focus:bg-white focus:shadow-[2px_2px_0_#121316]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex min-h-11 w-full items-center justify-center rounded-full border-2 border-[#121316] bg-[#FFE600] py-2.5 text-sm font-black text-[#121316] shadow-[3px_3px_0_#121316] transition hover:bg-amber-300 hover:shadow-[1px_1px_0_#121316] active:translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In ⚡'}
          </button>
        </form>

        <p className="font-sans mt-6 text-center text-xs font-medium text-stone-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-[#121316] underline decoration-[#FFE600] decoration-2">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
