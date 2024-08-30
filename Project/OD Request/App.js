import React from 'react';
import ODRequest from './ODRequest';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ODRequest />
    </ThemeProvider>
  );
}

export default App;