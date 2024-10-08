import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import SearchPage from './SearchPage';
import DailyAttendance from './DailyAttendance';
import WeeklyAttendance from './WeeklyAttendance';
import MonthlyAttendance from './MonthlyAttendance';
import './App.css'


const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route path="/daily/:sin" component={DailyAttendance} />
              <Route path="/weekly/:sin" component={WeeklyAttendance} />
              <Route path="/monthly/:sin" component={MonthlyAttendance} />
            </Switch>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
