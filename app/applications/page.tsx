"use client";
import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import ApplicationForm from '../../components/ApplicationForm';
import EditIcon from '@mui/icons-material/Edit';

const ApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whitelist' | 'admin' | null>(null);

  const whitelistFields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'Your Email', required: true },
    { id: 'minecraftUsername', label: 'Minecraft Username', type: 'text', placeholder: 'Your Minecraft Username', required: true },
    { id: 'reason', label: 'Reason for Joining', type: 'textarea', placeholder: 'Why do you want to join?', required: true },
  ];

  const adminFields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'Your Email', required: true },
    { id: 'minecraftUsername', label: 'Minecraft Username', type: 'text', placeholder: 'Your Minecraft Username', required: true },
    { id: 'discordName', label: 'Discord Name', type: 'text', placeholder: 'Your Discord Name', required: true },
    { id: 'experience', label: 'Experience', type: 'textarea', placeholder: 'Describe your experience as an admin', required: true },
    { id: 'reason', label: 'Reason for Applying', type: 'textarea', placeholder: 'Why do you want to be an admin?', required: true },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft flex flex-col">
      <Navigation />
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl mb-4">Applications</h1>
          <p className="text-xl">Please fill out the form below to apply for the whitelist or an admin position.</p>
        </header>
        {activeTab === null ? (
          <div className="flex justify-center mb-8">
            <button
              className="px-4 py-2 mx-2 rounded bg-blue-500 text-white"
              onClick={() => setActiveTab('whitelist')}
            >
              Whitelist Application
            </button>
            <button
              className="px-4 py-2 mx-2 rounded bg-blue-500 text-white"
              onClick={() => setActiveTab('admin')}
            >
              Admin Application
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
            {activeTab === 'whitelist' && (
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <ApplicationForm title="Whitelist Application" fields={whitelistFields} apiEndpoint="/api/application" type="whitelist" />
                <button
                  className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
                  onClick={() => setActiveTab(null)}
                >
                  Go Back
                </button>
              </div>
            )}
            {activeTab === 'admin' && (
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <ApplicationForm title="Admin Application" fields={adminFields} apiEndpoint="/api/application" type="admin" />
                <button
                  className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
                  onClick={() => setActiveTab(null)}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        )}
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

export default ApplicationsPage;