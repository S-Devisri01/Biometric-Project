import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, TextField, MenuItem, Select, FormControl,
  InputLabel, Snackbar, Alert, IconButton, Box, Grid, Card, CardContent, Avatar,
  Container, useTheme, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const reasons = [
  { value: 'Bank Issue', label: 'Bank Issue' },
  { value: 'Sick Leave', label: 'Sick Leave' },
  { value: 'Other', label: 'Other' }
];

const leaveTypes = [
  { value: 'OD', label: 'OD' },
  { value: 'Leave', label: 'Leave' },
  { value: 'Internship', label: 'Internship' }
];

function LeaveApplicationForm() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    sinNumber: '',
    email: '',
    reason: '',
    otherReason: '',
    leaveType: '',
    duration: ''
  });

  const [showOtherReason, setShowOtherReason] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'reason' && value === 'Other') {
      setShowOtherReason(true);
    } else if (name === 'reason') {
      setShowOtherReason(false);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.sinNumber || !formData.email || !formData.reason || !formData.leaveType || !formData.duration) {
      setSnackbarMessage('Please fill all required fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }

    if (formData.reason === 'Other' && !formData.otherReason) {
      setSnackbarMessage('Please provide the other reason.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbarMessage('Invalid email format.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSnackbarMessage('Form submitted successfully.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Leave Application
          </Typography>
          <AccountCircleIcon fontSize="large" />
          <IconButton color="inherit">
            <CancelIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
        <Card sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" gutterBottom sx={{ mb: 2 }}>
              Application Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Student Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="SIN Number"
                    name="sinNumber"
                    value={formData.sinNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Reason</InputLabel>
                    <Select
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      label="Reason"
                      required
                    >
                      {reasons.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {showOtherReason && (
                  <Grid item xs={12}>
                    <TextField
                      label="Other Reason"
                      name="otherReason"
                      value={formData.otherReason}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Leave Type</InputLabel>
                    <Select
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleChange}
                      label="Leave Type"
                      required
                    >
                      {leaveTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Duration (in Days)"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Box textAlign="center" sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default LeaveApplicationForm;