import Navigation from "@/components/Navigation";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft">
      <Navigation />
      <header className="text-center py-20">
        <h1 className="text-5xl mb-4">Welcome to KimDog SMP</h1>
        <p className="text-xl mb-8">Join our Minecraft Survival Multiplayer Server and embark on an epic adventure!</p>
        <Link href="/servers">
          <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
            Join Now
          </button>
        </Link>
      </header>
      <main className="px-4">
        <section className="my-12">
          <h2 className="text-3xl mb-4">About Our Server</h2>
          <p className="text-lg">
            KimDog SMP is a community-driven Minecraft server where players can explore, build, and survive together. Our server features custom plugins, regular events, and a friendly community.
          </p>
        </section>
        <section className="my-12">
          <h2 className="text-3xl mb-4">Server Features</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Custom Plugins</li>
            <li>Friendly Community</li>
            <li>Active Moderation</li>
            <li>Survival</li>
            <li>YouTuber Friendly</li>
            <li>Whitelisted</li>
          </ul>
        </section>
        <section className="my-12">
          <h2 className="text-3xl mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Image src="/images/gallery1.jpg" alt="Gallery Image 1" width={300} height={200} className="rounded" />
            <Image src="/images/gallery2.jpg" alt="Gallery Image 2" width={300} height={200} className="rounded" />
            <Image src="/images/gallery3.jpg" alt="Gallery Image 3" width={300} height={200} className="rounded" />
          </div>
        </section>
      </main>
      <footer className="text-center py-4">
        <p>&copy; 2025 KimDog SMP. All rights reserved.</p>
      </footer>
    </div>
  );
}