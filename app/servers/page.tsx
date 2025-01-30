"use client";
import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import EditIcon from '@mui/icons-material/Edit';

const ServersPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft flex flex-col">
      <Navigation />
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl mb-4">Join Our Servers</h1>
          <p className="text-xl">Follow the instructions below to join our Minecraft servers and Discord server.</p>
        </header>
        <section className="my-12 w-full max-w-4xl">
          <h2 className="text-3xl mb-4 text-center">Java Edition</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-smp/main/public/assets/Java.png" alt="Java Edition" width={300} height={200} className="rounded mb-4 md:mb-0 md:mr-4" />
            <div>
              <p className="text-lg mb-2">1. Open Minecraft Java Edition.</p>
              <p className="text-lg mb-2">2. Click on "Multiplayer".</p>
              <p className="text-lg mb-2">3. Click on "Add Server".</p>
              <p className="text-lg mb-2">4. Enter the server name: KimDog's SMP</p>
              <p className="text-lg mb-2">5. Enter the server address: play.kimdog-smp.com</p>
              <p className="text-lg mb-2">6. Click "Done" and then "Join Server".</p>
            </div>
          </div>
        </section>
        <section className="my-12 w-full max-w-4xl">
          <h2 className="text-3xl mb-4 text-center">Bedrock Edition</h2>
          <div className="flex flex-col md:flex-row items-center">
            <Image src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-smp/main/public/assets/Bedrock.png" alt="Bedrock Edition" width={300} height={200} className="rounded mb-4 md:mb-0 md:mr-4" />
            <div>
              <p className="text-lg mb-2">1. Open Minecraft Bedrock Edition.</p>
              <p className="text-lg mb-2">2. Click on "Play".</p>
              <p className="text-lg mb-2">3. Go to the "Servers" tab.</p>
              <p className="text-lg mb-2">4. Scroll down and click on "Add Server".</p>
              <p className="text-lg mb-2">5. Enter the server name: KimDog's SMP</p>
              <p className="text-lg mb-2">6. Enter the server address: play.kimdog-smp.com</p>
              <p className="text-lg mb-2">7. Enter the port: 19132</p>
              <p className="text-lg mb-2">8. Click "Save" and then "Join Server".</p>
            </div>
          </div>
        </section>
        <section className="my-12 w-full max-w-4xl">
          <h2 className="text-3xl mb-4 text-center">Join Our Discord Server</h2>
          <div className="flex flex-col items-center">
            <iframe
              src="https://discord.com/widget?id=1217211543712694272&theme=dark"
              width="350"
              height="500"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ServersPage;