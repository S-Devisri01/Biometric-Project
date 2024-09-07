import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import CancelIcon from '@mui/icons-material/Cancel';

const WeeklyAttendance = () => {
  const { sin } = useParams();
  const [weeklyData, setWeeklyData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Fetch weekly attendance data for the given SIN
    const fetchData = async () => {
      const data = {
        totalDays: 7,
        presentDays: 5,
        absentDays: 2,
        totalHoursWorked: 38.5, // Sum of hours worked
        dailyData: [
          { date: '2024-09-02', status: 'Present', hoursWorked: 8 },
          { date: '2024-09-03', status: 'Present', hoursWorked: 7.5 },
          { date: '2024-09-04', status: 'Absent', hoursWorked: 0 },
          { date: '2024-09-05', status: 'Present', hoursWorked: 8 },
          { date: '2024-09-06', status: 'Present', hoursWorked: 8 },
          { date: '2024-09-07', status: 'Absent', hoursWorked: 0 },
          { date: '2024-09-08', status: 'Present', hoursWorked: 7 },
        ],
      };
      setWeeklyData(data);
    };
    fetchData();
  }, [sin]);

  const handleBack = () => {
    history.push('/');
  };

  if (!weeklyData) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Weekly Attendance for SIN: {sin}</Typography>
        <IconButton
          onClick={handleBack}
          color="primary"
          aria-label="back to search"
          sx={{ padding: 1 }}
        >
          <CancelIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Weekly Summary and Chart */}
      <Grid container spacing={2}>
        {/* Weekly Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Days</Typography>
              <Typography>{weeklyData.totalDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Present Days</Typography>
              <Typography>{weeklyData.presentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Absent Days</Typography>
              <Typography>{weeklyData.absentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Hours Worked</Typography>
              <Typography>{weeklyData.totalHoursWorked}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Hours Worked Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Weekly Hours Worked</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(tick) => format(new Date(tick), 'dd-MMM')}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => format(new Date(label), 'dd-MMM-yyyy')}
                  />
                  <Legend />
                  <Bar dataKey="hoursWorked" fill="#8884d8" name="Hours Worked" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Daily Breakdown */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Daily Breakdown
      </Typography>
      <Grid container spacing={2}>
        {weeklyData.dailyData.map((day) => (
          <Grid item xs={12} md={3} key={day.date}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">
                  Date: {format(new Date(day.date), 'dd-MMM-yyyy')}
                </Typography>
                <Typography>Status: {day.status}</Typography>
                <Typography>Hours Worked: {day.hoursWorked}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyAttendance;
