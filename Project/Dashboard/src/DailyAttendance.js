import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import CancelIcon from '@mui/icons-material/Cancel';

const DailyAttendance = () => {
  const { sin } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Fetch attendance data for the given SIN
    // This is a placeholder, replace with actual API call
    const fetchData = async () => {
      const data = {
        date: '2024-09-05',
        status: 'Present',
        inTime: '09:00 AM',
        outTime: '05:00 PM',
        hoursWorked: 8
      };
      setAttendanceData(data);
    };
    fetchData();
  }, [sin]);

  const handleBack = () => {
    history.push('/');
  };

  if (!attendanceData) return <Typography>Loading...</Typography>;

  const formattedDate = format(new Date(attendanceData.date), 'dd-MMM-yyyy');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Daily Attendance for SIN: {sin}</Typography>
        <IconButton 
          onClick={handleBack} 
          color="primary" 
          aria-label="back to search"
          sx={{ padding: 1 }}
        >
          <CancelIcon fontSize="large" />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Date</Typography>
              <Typography>{formattedDate}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Status</Typography>
              <Typography>{attendanceData.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">In Time</Typography>
              <Typography>{attendanceData.inTime}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Out Time</Typography>
              <Typography>{attendanceData.outTime}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h6">Hours Worked</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[attendanceData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), 'dd-MMM')} />
              <YAxis />
              <Tooltip labelFormatter={(label) => format(new Date(label), 'dd-MMM-yyyy')} />
              <Legend />
              <Bar dataKey="hoursWorked" fill="#8884d8" name="Hours Worked" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DailyAttendance;