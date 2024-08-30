import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import './ODRequest.css';
import logo from './logo.png'; // Ensure you have a logo image in your src folder

const ODRequest = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleAction = (action) => {
    setSnackbar({
      open: true,
      message: `OD request ${action} successfully`,
      severity: action === 'approved' ? 'success' : 'error',
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {/* Header Section */}
      <Box className="header">
        <Box className="logo">
          <img src={logo} alt="Sri Shanmugha Logo" />
         
        </Box>
        <Box className="icon-buttons">
          <Button className="icon-button">✕</Button>
        </Box>
      </Box>
      
      {/* Main Container Section */}
      <Box className="OD-request-container" sx={{ margin: '20px auto', maxWidth: '900px' }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              OD Request
            </Typography>

            <Box className="form-container">
              <Box className="form-content">
                <Box className="left-side">
                  <Typography variant="body2" className="label">Student Name:</Typography>
                  <Typography variant="body1" className="value">Harshini Boopathi</Typography>
                  <Typography variant="body2" className="label">Email ID:</Typography>
                  <Typography variant="body1" className="value">student@shanmugha.edu.in</Typography>
                  <Typography variant="body2" className="label">Reason:</Typography>
                  <Typography variant="body1" className="value">[reason here]</Typography>
                  <Typography variant="body2" className="label">Start Date:</Typography>
                  <Typography variant="body1" className="value">[start date here]</Typography>
                </Box>

                <Box className="right-side">
                  <Typography variant="body2" className="label">SIN Number:</Typography>
                  <Typography variant="body1" className="value">E21IT099</Typography>
                  <Typography variant="body2" className="label">OD Type:</Typography>
                  <Typography variant="body1" className="value">Seminar Leave</Typography>
                  <Typography variant="body2" className="label">Duration:</Typography>
                  <Typography variant="body1" className="value">[duration here]</Typography>
                  <Typography variant="body2" className="label">End Date:</Typography>
                  <Typography variant="body1" className="value">[end date here]</Typography>
                </Box>
              </Box>

              <Box className="button-group">
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={() => handleAction('rejected')}
                >
                  Reject
                </Button>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => handleAction('approved')}
                >
                  Approved
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
       </Snackbar>
    </Box>
  );
};



export default ODRequest;
