import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 font-minecraft">
            <div className="text-white text-2xl">
                <Link href="/">Minecraft SMP</Link>
            </div>
            <ul className="flex space-x-4 mt-2">
                <li>
                    <Link href="/" className="text-white hover:text-gray-400">Home</Link>
                </li>
                <li>
                    <Link href="/about" className="text-white hover:text-gray-400">About</Link>
                </li>
                <li>
                    <Link href="/servers" className="text-white hover:text-gray-400">Servers</Link>
                </li>
                <li>
                    <Link href="/contact" className="text-white hover:text-gray-400">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;