"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const AuthContent: React.FC = () => {
  const searchParams = useSearchParams();
  const mode = searchParams ? searchParams.get('mode') : null;
  const [identifier, setIdentifier] = useState(''); // This will be used for both username and email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (mode === 'login') {
      // Handle login logic here
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful');
        // Handle successful login (e.g., store token, redirect, etc.)
      } else {
        setMessage(data.message);
      }
    } else {
      // Handle sign-up logic here
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Sign-up successful');
        // Handle successful sign-up (e.g., redirect to login, etc.)
      } else {
        setMessage(data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {mode === 'login' && (
            <div className="mb-4">
              <label htmlFor="identifier" className="block text-sm font-medium">Username or Email</label>
              <input
                type="text"
                id="identifier"
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {mode === 'signup' && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300">
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
        <p className="mt-4 text-sm">
          {mode === 'signup' ? (
            <>
              Already have an account? <Link href="/auth?mode=login" className="text-blue-500 hover:underline">Login</Link>
            </>
          ) : (
            <>
              Don't have an account? <Link href="/auth?mode=signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const Auth: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
};

export default Auth;