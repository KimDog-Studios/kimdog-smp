import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface ApplicationFormProps {
  title: string;
  fields: { id: string; label: string; type: string; placeholder: string; required: boolean }[];
  apiEndpoint: string;
  type: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ title, fields, apiEndpoint, type }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type }),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({});
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send application.' });
    }
  };

  return (
    <section className="w-full max-w-md">
      <h2 className="text-3xl mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="mb-4" key={field.id}>
            <label className="block text-lg mb-2" htmlFor={field.id}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                className="w-full p-4 text-lg rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={field.placeholder}
                required={field.required}
                rows={5} // Adjust the number of rows for the textarea
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                className="w-full p-4 text-lg rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded transition duration-300 transform hover:scale-105 text-lg"
        >
          Submit
        </button>
        {status && (
          <div className="mt-4">
            <Alert severity={status.type}>
              <AlertTitle>{status.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              {status.message}
            </Alert>
          </div>
        )}
      </form>
    </section>
  );
};

export default ApplicationForm;