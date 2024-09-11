import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, TextField, MenuItem, FormControl,
  Snackbar, Alert, IconButton, Box, Grid, Card, CardContent, Container,
  useTheme, useMediaQuery
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import img from "./assets/logo.png";
import "./App.css";

// Simulate fetching user leave data from an API or database
const initialLeaveBalance = {
  leave: 5,
  od: 5,
  internship: Infinity
};

const alreadyTakenLeave = {
  leave: 2,
  od: 1,
  internship: 2
};

const leaveTypes = [
  { value: 'Leave', label: 'Leave' },
  { value: 'OD', label: 'OD' },
  { value: 'Internship', label: 'Internship' }
];

const leaveReasons = [
  { value: 'Casual Leave', label: 'Casual Leave' },
  { value: 'Sick Leave', label: 'Sick Leave' },
  { value: 'Festival Leave', label: 'Festival Leave' },
  { value: 'Other', label: 'Other' }
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
    odReason: '',
    startDate: '',
    endDate: '',
    duration: ''
  });

  const [leaveType, setLeaveType] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [leaveBalance, setLeaveBalance] = useState({
    leave: initialLeaveBalance.leave - alreadyTakenLeave.leave,
    od: initialLeaveBalance.od - alreadyTakenLeave.od,
    internship: initialLeaveBalance.internship
  });
  const [isFormSubmittedToday, setIsFormSubmittedToday] = useState(false);

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInTime = end - start;
    return Math.ceil(diffInTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'leaveType') {
      setLeaveType(value);
    }

    if (name === 'reason') {
      setFormData(prevData => ({
        ...prevData,
        reason: value,
        otherReason: value === 'Other' ? prevData.otherReason : ''
      }));
    }

    if (name === 'startDate' || name === 'endDate') {
      const duration = calculateDuration(
        name === 'startDate' ? value : formData.startDate,
        name === 'endDate' ? value : formData.endDate
      );
      setFormData((prevData) => ({
        ...prevData,
        duration: duration
      }));
    }
  };

  const validateForm = () => {
    const duration = formData.duration;

    if (!formData.name || !formData.sinNumber || !formData.email || !formData.startDate || !formData.endDate) {
      setSnackbarMessage('Please fill all required fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }

    if (leaveType === 'Leave' && !formData.reason) {
      setSnackbarMessage('Please select a reason.');
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

    if ((leaveType === 'OD' || leaveType === 'Internship') && !formData.odReason) {
      setSnackbarMessage('Please provide a reason.');
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

    if (leaveType === 'Leave' && duration > leaveBalance.leave) {
      setSnackbarMessage('Insufficient leave balance.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }

    if (leaveType === 'OD' && duration > leaveBalance.od) {
      setSnackbarMessage('Insufficient OD balance.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormSubmittedToday) {
      setSnackbarMessage('You have already submitted the form today.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    const duration = formData.duration;

    if (leaveType === 'Leave') {
      setLeaveBalance((prev) => ({ ...prev, leave: prev.leave - duration }));
    } else if (leaveType === 'OD') {
      setLeaveBalance((prev) => ({ ...prev, od: prev.od - duration }));
    }

    setSnackbarMessage(`${leaveType} form successfully submitted.`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setIsFormSubmittedToday(true);
  };

  return (
    <Box>
      <AppBar color="primary">
        <Toolbar className='head'>
          <Typography variant="h6">
            <img src={img} alt='img'/>
          </Typography>
          <div className='icon' color="inherit">
            <IconButton color="inherit">
              <CancelIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mb: 2, mt: 3, p: 3 }}>
        <Box sx={{ mb: 4, mt:2
         }}>
          <FormControl fullWidth>
            <Typography variant="h6">Select Form Type</Typography>
            <TextField
              select
              name="leaveType"
              label="Form Type"
              value={leaveType}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {leaveTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          {/* Conditionally render the leave/OD balance based on the selected leaveType */}
          <Box sx={{mb:2, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            {leaveType === 'Leave' && (
              <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body1" textAlign="center">
                    <strong>Leave Balance:</strong> {leaveBalance.leave} days
                  </Typography>
                </CardContent>
              </Card>
            )}
            {leaveType === 'OD' && (
              <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body1" textAlign="center">
                    <strong>OD Balance:</strong> {leaveBalance.od} days
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Card sx={{ p: 4, borderRadius: 3, maxHeight: '500px', overflowY: 'auto' }}> {/* Set scrollable height */}
            <CardContent>
              <Typography variant="h6" gutterBottom>Student Information</Typography>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Sin Number" name="sinNumber" value={formData.sinNumber} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />

              {leaveType === 'Leave' && (
                <Box>
                  <TextField
                    select
                    name="reason"
                    label="Leave Reason"
                    value={formData.reason}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    {leaveReasons.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* {formData.reason === 'Other' && (
                    <TextField
                      name="otherReason"
                      label="Other Reason"
                      value={formData.otherReason}
                      onChange={handleChange}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  )} */}
                </Box>
              )}

              {(leaveType === 'OD' || leaveType === 'Internship' || leaveType === 'Leave') && (
                <TextField
                  name="Reason"
                  label="Reason for Leave/OD/Internship"
                  value={formData.odReason}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Typography variant="body1" sx={{ mt: 2 }}>
                Duration: {formData.duration} days
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LeaveApplicationForm;
