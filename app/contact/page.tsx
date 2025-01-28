"use client";
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import EditIcon from '@mui/icons-material/Edit';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft flex flex-col">
      <Navigation />
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you! Please fill out the form below to get in touch.</p>
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
            <label className="block text-lg mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Message"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Send Message
          </button>
          {status && <p className="mt-4 text-center">{status}</p>}
        </form>
      </main>
      <footer className="text-center py-4 border-t border-gray-700">
        <p>&copy; 2025 KimDog SMP. All rights reserved.</p>
        <a href="https://github.com/KimDog-Studios/kimdog-smp" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center justify-center">
          <EditIcon className="mr-2" />
          Edit this page on GitHub
        </a>
      </footer>
    </div>
  );
};

export default ContactPage;