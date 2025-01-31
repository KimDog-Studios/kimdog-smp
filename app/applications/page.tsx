"use client";
import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import ApplicationForm from '../../components/ApplicationForm';

const ApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whitelist' | 'admin' | 'youtube' | null>(null);

  const fields: { [key in 'whitelist' | 'admin' | 'youtube']: { id: string; label: string; type: string; placeholder: string; required: boolean; }[] } = {
    whitelist: [
      { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', required: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
      { id: 'minecraftUsername', label: 'Minecraft Username', type: 'text', placeholder: 'Enter your Minecraft username', required: true },
      { id: 'uuid', label: 'UUID', type: 'text', placeholder: 'Enter your UUID', required: true },
      { id: 'discordName', label: 'Discord Name', type: 'text', placeholder: 'Enter your Discord name', required: true },
      { id: 'reason', label: 'Reason', type: 'textarea', placeholder: 'Enter your reason', required: true },
    ],
    admin: [
      { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', required: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
      { id: 'minecraftUsername', label: 'Minecraft Username', type: 'text', placeholder: 'Enter your Minecraft username', required: true },
      { id: 'discordName', label: 'Discord Name', type: 'text', placeholder: 'Enter your Discord name', required: true },
      { id: 'experience', label: 'Experience', type: 'textarea', placeholder: 'Enter your experience', required: true },
      { id: 'reason', label: 'Reason', type: 'textarea', placeholder: 'Enter your reason', required: true },
    ],
    youtube: [
      { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', required: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
      { id: 'minecraftUsername', label: 'Minecraft Username', type: 'text', placeholder: 'Enter your Minecraft username', required: true },
      { id: 'uuid', label: 'UUID', type: 'text', placeholder: 'Enter your UUID', required: true },
      { id: 'youtubeChannel', label: 'YouTube Channel', type: 'text', placeholder: 'Enter your YouTube channel', required: true },
      { id: 'subscribers', label: 'Subscribers', type: 'number', placeholder: 'Enter your subscriber count', required: true },
      { id: 'reason', label: 'Reason', type: 'textarea', placeholder: 'Enter your reason', required: true },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Applications</h1>
        <div className="flex justify-center mb-8">
          <button
            className="mx-2 px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => setActiveTab('whitelist')}
          >
            Whitelist Application
          </button>
          <button
            className="mx-2 px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => setActiveTab('admin')}
          >
            Admin Application
          </button>
          <button
            className="mx-2 px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => setActiveTab('youtube')}
          >
            YouTube Rank Application
          </button>
        </div>
        {activeTab && (
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <ApplicationForm
                title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Application`}
                fields={fields[activeTab]}
                apiEndpoint="/api/main"
                type={activeTab}
              />
              <button
                className="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
                onClick={() => setActiveTab(null)}
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplicationsPage;