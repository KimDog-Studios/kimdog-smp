import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Alert, Box, Typography, createTheme, ThemeProvider, Link } from '@mui/material';

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface ApplicationFormProps {
  title: string;
  fields: Field[];
  apiEndpoint: string;
  type: string;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a73e8',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const ApplicationForm: React.FC<ApplicationFormProps> = ({ title, fields, apiEndpoint, type }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form data:', formData); // Log form data

    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, { // Use the passed apiEndpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type }), // Include type in the request body
      });

      const responseText = await response.text(); // Get response text for logging
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseText}`);
      }

      const result = await response.json();
      setSuccess(result.message);
      setError('');
    } catch (error: any) {
      setError(error.message);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleUUIDClick = () => {
    const username = formData.minecraftUsername;
    if (!username) {
      setError('Please enter your Minecraft username first.');
      return;
    }
    window.open(`https://mcuuid.net/?q=${username}`, '_blank');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, border: '1px solid #333', borderRadius: 2, backgroundColor: 'background.paper' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Box key={field.id} mb={3}>
              <TextField
                id={field.id}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                fullWidth
                variant="outlined"
                onChange={handleChange}
                multiline={field.type === 'textarea'}
                rows={field.type === 'textarea' ? 4 : undefined}
                value={formData[field.id] || ''}
              />
              {field.id === 'uuid' && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUUIDClick}
                  >
                    Get UUID
                  </Button>
                </Box>
              )}
            </Box>
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default ApplicationForm;