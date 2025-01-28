import React, { useState } from 'react';

interface ApplicationFormProps {
  title: string;
  fields: { id: string; label: string; type: string; placeholder: string; required: boolean }[];
  apiEndpoint: string;
  type: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ title, fields, apiEndpoint, type }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type }),
      });
      if (response.ok) {
        setStatus('Application sent successfully!');
        setFormData({});
      } else {
        setStatus('Failed to send application.');
      }
    } catch (error) {
      setStatus('Failed to send application.');
    }
  };

  return (
    <section className="w-full md:w-1/2">
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
                className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105"
        >
          Submit
        </button>
        {status && <p className="mt-4">{status}</p>}
      </form>
    </section>
  );
};

export default ApplicationForm;