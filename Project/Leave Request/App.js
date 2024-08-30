import React from 'react';
import LeaveRequest from './LeaveRequest';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LeaveRequest />
    </ThemeProvider>
  );
}

export default App;