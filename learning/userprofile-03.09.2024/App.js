// File: src/App.js
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import UserProfileDashboard from './components/UserProfileDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProfileDashboard />
    </ThemeProvider>
  );
}

export default App;