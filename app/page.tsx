"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import videos from '../config/videos';

export default function Home() {
  interface ServerStatus {
    javaStatus: {
      players: {
        online: number;
        max: number;
      };
    } | null;
    bedrockStatus: {
      players: {
        online: number;
        max: number;
      };
    } | null;
  }

  const [serverStatus, setServerStatus] = useState<ServerStatus>({ javaStatus: null, bedrockStatus: null });

  useEffect(() => {
    async function fetchServerStatus() {
      try {
        const response = await fetch('/api/status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServerStatus(data);
      } catch (error) {
        console.error('Error fetching server status:', error);
      }
    }

    fetchServerStatus();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft">
      <Navigation />
      <header className="text-center py-20 bg-cover bg-center">
        <h1 className="text-5xl mb-4 animate-fadeIn">Welcome to KimDog SMP</h1>
        <p className="text-xl mb-8 animate-fadeIn delay-1s">Join our Minecraft Survival Multiplayer Server and embark on an epic adventure!</p>
        <Link href="/servers">
          <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105">
            Join Now
          </button>
        </Link>
        {serverStatus.javaStatus && serverStatus.bedrockStatus && (
          <div className="mt-8">
            <p className="text-lg">Java Server IP: play.kimdog-smp.com</p>
            <p className="text-lg">Java Players Online: {serverStatus.javaStatus.players.online}/{serverStatus.javaStatus.players.max}</p>
            <p className="text-lg mt-4">Bedrock Server IP: play.kimdog-smp.com</p>
            <p className="text-lg">Bedrock Players Online: {serverStatus.bedrockStatus.players.online}/{serverStatus.bedrockStatus.players.max}</p>
          </div>
        )}
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
      </main>
      <footer className="text-center py-4 border-t border-gray-700">
        <p>&copy; 2025 KimDog SMP. All rights reserved.</p>
      </footer>
    </div>
  );
}