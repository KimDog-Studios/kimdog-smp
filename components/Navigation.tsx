import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 font-minecraft shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl">
          <Link href="/">KimDog's SMP</Link>
        </div>
        <ul className="flex space-x-6 ml-auto">
          <li>
            <Link href="/" className="text-white hover:text-gray-400 transition-colors duration-300">Home</Link>
          </li>
          <li>
            <Link href="/applications" className="text-white hover:text-gray-400 transition-colors duration-300">Applications</Link>
          </li>
          <li>
            <Link href="/servers" className="text-white hover:text-gray-400 transition-colors duration-300">Servers</Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-gray-400 transition-colors duration-300">Contact</Link>
          </li>
          <li>
            <Link href="/auth?mode=login" className="text-white hover:text-gray-400 transition-colors duration-300">Login</Link>
          </li>
          <li>
            <Link href="/auth?mode=signup" className="text-white hover:text-gray-400 transition-colors duration-300">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;