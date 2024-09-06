import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import CancelIcon from '@mui/icons-material/Cancel';

const MonthlyAttendance = () => {
  const { sin } = useParams();
  const [monthlyData, setMonthlyData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Fetch monthly attendance data for the given SIN
    // This is a placeholder, replace with actual API call
    const fetchData = async () => {
      const currentDate = new Date();
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

      const data = {
        totalDays: daysInMonth.length,
        presentDays: 22,
        absentDays: 6,
        holidayDays: 2,
        dailyData: daysInMonth.map(day => ({
          date: format(day, 'yyyy-MM-dd'),
          status: Math.random() > 0.2 ? 'Present' : Math.random() > 0.5 ? 'Absent' : 'Holiday',
          hoursWorked: Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 5 : 0,
        }))
      };
      setMonthlyData(data);
    };
    fetchData();
  }, [sin]);

  const handleBack = () => {
    history.push('/');
  };

  if (!monthlyData) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Monthly Attendance for SIN: {sin}</Typography>
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
              <Typography variant="h6">Total Days</Typography>
              <Typography>{monthlyData.totalDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Present Days</Typography>
              <Typography>{monthlyData.presentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Absent Days</Typography>
              <Typography>{monthlyData.absentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Holiday Days</Typography>
              <Typography>{monthlyData.holidayDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h6">Monthly Attendance Overview</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData.dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(tick) => format(new Date(tick), 'dd')}
                interval={2}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(label) => format(new Date(label), 'dd-MMM-yyyy')}
                formatter={(value, name) => [value, name === 'hoursWorked' ? 'Hours Worked' : name]}
              />
              <Legend />
              <Bar dataKey="hoursWorked" fill="#8884d8" name="Hours Worked" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Typography variant="h6">Daily Breakdown</Typography>
      <Grid container spacing={2}>
        {monthlyData.dailyData.map((day) => (
          <Grid item xs={6} sm={4} md={2} key={day.date}>
            <Card sx={{ 
              bgcolor: day.status === 'Present' ? '#e8f5e9' : 
                       day.status === 'Absent' ? '#ffebee' : '#e3f2fd'
            }}>
              <CardContent>
                <Typography variant="subtitle2">{format(new Date(day.date), 'dd-MMM')}</Typography>
                <Typography variant="body2">Status: {day.status}</Typography>
                <Typography variant="body2">Hours: {day.hoursWorked}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MonthlyAttendance;