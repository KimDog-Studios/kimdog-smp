"use client";
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';

const WhitelistingPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [minecraftUsername, setMinecraftUsername] = useState('');
  const [uuid, setUuid] = useState('');
  const [discordName, setDiscordName] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('/api/whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, minecraftUsername, uuid, discordName, reason }),
      });
      if (response.ok) {
        setStatus('Application sent successfully!');
        setName('');
        setEmail('');
        setMinecraftUsername('');
        setUuid('');
        setDiscordName('');
        setReason('');
      } else {
        setStatus('Failed to send application.');
      }
    } catch (error) {
      setStatus('Failed to send application.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft flex flex-col">
      <Navigation />
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl mb-4">Whitelist Application</h1>
          <p className="text-xl">Please fill out the form below to apply for the whitelist.</p>
        </header>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="minecraftUsername">Minecraft Username</label>
            <input
              type="text"
              id="minecraftUsername"
              value={minecraftUsername}
              onChange={(e) => setMinecraftUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Minecraft Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="uuid">UUID</label>
            <input
              type="text"
              id="uuid"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your UUID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="discordName">Discord Name</label>
            <input
              type="text"
              id="discordName"
              value={discordName}
              onChange={(e) => setDiscordName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Discord Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="reason">Reason for Joining</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Why do you want to join?"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105"
          >
            Submit
          </button>
          {status && <p className="mt-4">{status}</p>}
        </form>
      </main>
    </div>
  );
};

export default WhitelistingPage;