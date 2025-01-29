"use client";
import { useState } from 'react';
import Navigation from '../../components/Navigation';

export default function Vote() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setUsername('');
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit vote' });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft">
      <Navigation />

      <main className="px-4">
        <section className="my-12 text-center">
          <h2 className="text-3xl mb-4 border-b-2 border-green-500 pb-2">Vote for KimDog SMP</h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Support our server by voting! Enter your Minecraft username below and click "Vote Now".
          </p>
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your Minecraft username"
              className="w-full p-4 text-lg rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded transition duration-300 transform hover:scale-105 text-lg">
              Vote Now
            </button>
          </form>
          {status && (
            <div className={`mt-4 text-lg ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {status.message}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}