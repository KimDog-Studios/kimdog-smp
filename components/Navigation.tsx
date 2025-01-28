import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 font-minecraft shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl">
                    <Link href="/">KimDog's SMP</Link>
                </div>
                <div className="flex-grow mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/" className="text-white hover:text-gray-400 transition-colors duration-300">Home</Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-white hover:text-gray-400 transition-colors duration-300">About</Link>
                    </li>
                    <li>
                        <Link href="/servers" className="text-white hover:text-gray-400 transition-colors duration-300">Servers</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="text-white hover:text-gray-400 transition-colors duration-300">Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;