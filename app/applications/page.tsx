"use client";
import React from 'react';
import Navigation from '@/components/Navigation';
import ApplicationForm from '@/components/ApplicationForm';

const ApplicationsPage: React.FC = () => {
  const whitelistFields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'Your Email', required: true },
    { id: 'minecraftUsername', label: 'Minecraft Username', type: 'text', placeholder: 'Your Minecraft Username', required: true },
    { id: 'uuid', label: 'UUID', type: 'text', placeholder: 'Your UUID', required: true },
    { id: 'discordName', label: 'Discord Name', type: 'text', placeholder: 'Your Discord Name', required: true },
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
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
          <ApplicationForm title="Whitelist Application" fields={whitelistFields} apiEndpoint="/api/application" type="whitelist" />
          <ApplicationForm title="Admin Application" fields={adminFields} apiEndpoint="/api/application" type="admin" />
        </div>
      </main>
    </div>
  );
};

export default ApplicationsPage;