"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import videos from '../config/videos';
import staffMembers from '../config/staffTeam';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft">
      <Navigation />

      <header className="text-center py-20 bg-cover bg-center">
        <h1 className="text-5xl mb-4 animate-fadeIn">Welcome to KimDog SMP</h1>
        <p className="text-xl mb-8 animate-fadeIn delay-1s">Join our Minecraft Survival Multiplayer Server and embark on an epic adventure!</p>
        <div className="flex justify-center space-x-4">
          <Link href="/applications">
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105">
              Apply Now
            </button>
          </Link>
          <a href="https://discord.gg/qqkESddDgc" target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105">
              Join Discord
            </button>
          </a>
        </div>
      </header>

      <main className="px-4">
        <section className="my-12 text-center">
          <h2 className="text-3xl mb-4 border-b-2 border-green-500 pb-2">About Our Server</h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            KimDog SMP is a community-driven Minecraft server where players can explore, build, and survive together. Our server features custom plugins, regular events, and a friendly community.
          </p>
        </section>
        <section className="my-12 text-center">
          <h2 className="text-3xl mb-4 border-b-2 border-green-500 pb-2">Server Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Custom Plugins</h3>
              <p className="text-lg">Enhance your gameplay with unique plugins.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Friendly Community</h3>
              <p className="text-lg">Join a welcoming and active community.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Active Moderation</h3>
              <p className="text-lg">Enjoy a safe and fair gaming environment.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Survival</h3>
              <p className="text-lg">Experience the thrill of survival gameplay.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">YouTuber Friendly</h3>
              <p className="text-lg">Create content with ease on our server.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Whitelisted</h3>
              <p className="text-lg">Join an exclusive and dedicated player base.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Crate System</h3>
              <p className="text-lg">Use your Keys to get Rewards.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Java Edition</h3>
              <p className="text-lg">1.21.4</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl mb-2">Bedrock Edition</h3>
              <p className="text-lg">1.21.4</p>
            </div>
          </div>
        </section>
        <section className="my-12 text-center">
          <h2 className="text-3xl mb-4 border-b-2 border-green-500 pb-2">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="rounded shadow-lg transform hover:scale-105 transition duration-300">
                <iframe
                  width="100%"
                  height="315"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded"
                ></iframe>
              </div>
            ))}
          </div>
        </section>
        <section className="my-12 text-center">
          <h2 className="text-3xl mb-4 border-b-2 border-green-500 pb-2">Staff Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {staffMembers.map((member) => (
              <div
                key={member.id}
                className="rounded shadow-lg transform hover:scale-105 transition duration-300 bg-gray-800 p-6"
              >
                <img src={`https://crafatar.com/avatars/${member.uuid}?size=100&overlay=true`} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-2xl mb-2">{member.name}</h3>
                <p className={`text-lg ${member.role === 'Owner' ? 'text-red-500' : member.role === 'Co-Owner' ? 'text-green-500' : ''}`}>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="text-center py-4 border-t border-gray-700">
        <p>&copy; 2025 KimDog SMP. All rights reserved.</p>
      </footer>
    </div>
  );
}