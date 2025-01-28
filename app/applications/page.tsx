"use client";
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';

const ApplicationsPage: React.FC = () => {
  const [whitelistName, setWhitelistName] = useState('');
  const [whitelistEmail, setWhitelistEmail] = useState('');
  const [whitelistMinecraftUsername, setWhitelistMinecraftUsername] = useState('');
  const [whitelistUuid, setWhitelistUuid] = useState('');
  const [whitelistDiscordName, setWhitelistDiscordName] = useState('');
  const [whitelistReason, setWhitelistReason] = useState('');
  const [whitelistStatus, setWhitelistStatus] = useState('');

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminMinecraftUsername, setAdminMinecraftUsername] = useState('');
  const [adminDiscordName, setAdminDiscordName] = useState('');
  const [adminExperience, setAdminExperience] = useState('');
  const [adminReason, setAdminReason] = useState('');
  const [adminStatus, setAdminStatus] = useState('');

  const handleWhitelistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWhitelistStatus('Sending...');
    try {
      const response = await fetch('/api/whitelist-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: whitelistName, email: whitelistEmail, minecraftUsername: whitelistMinecraftUsername, uuid: whitelistUuid, discordName: whitelistDiscordName, reason: whitelistReason }),
      });
      if (response.ok) {
        setWhitelistStatus('Application sent successfully!');
        setWhitelistName('');
        setWhitelistEmail('');
        setWhitelistMinecraftUsername('');
        setWhitelistUuid('');
        setWhitelistDiscordName('');
        setWhitelistReason('');
      } else {
        setWhitelistStatus('Failed to send application.');
      }
    } catch (error) {
      setWhitelistStatus('Failed to send application.');
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminStatus('Sending...');
    try {
      const response = await fetch('/api/admin-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: adminName, email: adminEmail, minecraftUsername: adminMinecraftUsername, discordName: adminDiscordName, experience: adminExperience, reason: adminReason }),
      });
      if (response.ok) {
        setAdminStatus('Application sent successfully!');
        setAdminName('');
        setAdminEmail('');
        setAdminMinecraftUsername('');
        setAdminDiscordName('');
        setAdminExperience('');
        setAdminReason('');
      } else {
        setAdminStatus('Failed to send application.');
      }
    } catch (error) {
      setAdminStatus('Failed to send application.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft flex flex-col">
      <Navigation />
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl mb-4">Applications</h1>
          <p className="text-xl">Please fill out the form below to apply for the whitelist or an admin position.</p>
        </header>
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
          <section className="w-full md:w-1/2">
            <h2 className="text-3xl mb-4">Whitelist Application</h2>
            <form onSubmit={handleWhitelistSubmit}>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="whitelistName">Name</label>
                <input
                  type="text"
                  id="whitelistName"
                  value={whitelistName}
                  onChange={(e) => setWhitelistName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="whitelistEmail">Email</label>
                <input
                  type="email"
                  id="whitelistEmail"
                  value={whitelistEmail}
                  onChange={(e) => setWhitelistEmail(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="whitelistMinecraftUsername">Minecraft Username</label>
                <input
                  type="text"
                  id="whitelistMinecraftUsername"
                  value={whitelistMinecraftUsername}
                  onChange={(e) => setWhitelistMinecraftUsername(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Minecraft Username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="whitelistUuid">UUID</label>
                <input
                  type="text"
                  id="whitelistUuid"
                  value={whitelistUuid}
                  onChange={(e) => setWhitelistUuid(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your UUID"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="whitelistDiscordName">Discord Name</label>
                <input
                  type="text"
                  id="whitelistDiscordName"
                  value={whitelistDiscordName}
                  onChange={(e) => setWhitelistDiscordName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Discord Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="whitelistReason">Reason for Joining</label>
                <textarea
                  id="whitelistReason"
                  value={whitelistReason}
                  onChange={(e) => setWhitelistReason(e.target.value)}
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
              {whitelistStatus && <p className="mt-4">{whitelistStatus}</p>}
            </form>
          </section>
          <section className="w-full md:w-1/2">
            <h2 className="text-3xl mb-4">Admin Application</h2>
            <form onSubmit={handleAdminSubmit}>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="adminName">Name</label>
                <input
                  type="text"
                  id="adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="adminEmail">Email</label>
                <input
                  type="email"
                  id="adminEmail"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="adminMinecraftUsername">Minecraft Username</label>
                <input
                  type="text"
                  id="adminMinecraftUsername"
                  value={adminMinecraftUsername}
                  onChange={(e) => setAdminMinecraftUsername(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Minecraft Username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="adminDiscordName">Discord Name</label>
                <input
                  type="text"
                  id="adminDiscordName"
                  value={adminDiscordName}
                  onChange={(e) => setAdminDiscordName(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Discord Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="adminExperience">Experience</label>
                <textarea
                  id="adminExperience"
                  value={adminExperience}
                  onChange={(e) => setAdminExperience(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Describe your experience as an admin"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="adminReason">Reason for Applying</label>
                <textarea
                  id="adminReason"
                  value={adminReason}
                  onChange={(e) => setAdminReason(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Why do you want to be an admin?"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105"
              >
                Submit
              </button>
              {adminStatus && <p className="mt-4">{adminStatus}</p>}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ApplicationsPage;