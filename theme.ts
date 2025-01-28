import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'SuperBakery, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1e3a8a', // Customize your primary color
    },
    secondary: {
      main: '#10b981', // Customize your secondary color
    },
  },
});

export default theme;