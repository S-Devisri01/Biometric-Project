import React from 'react';
import OutpassRequest from './OutpassRequest';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OutpassRequest />
    </ThemeProvider>
  );
}

export default App;