import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const WeeklyAttendance = () => {
  const { sin } = useParams();
  const [weeklyData, setWeeklyData] = useState(null);

  useEffect(() => {
    // Fetch weekly attendance data for the given SIN
    // This is a placeholder, replace with actual API call
    const fetchData = async () => {
      const data = {
        totalDays: 7,
        presentDays: 5,
        absentDays: 2,
        dailyData: [
          { date: '2024-09-02', status: 'Present', hoursWorked: 8 },
          { date: '2024-09-03', status: 'Present', hoursWorked: 7.5 },
          { date: '2024-09-04', status: 'Absent', hoursWorked: 0 },
          { date: '2024-09-05', status: 'Present', hoursWorked: 8 },
          { date: '2024-09-06', status: 'Present', hoursWorked: 8 },
          { date: '2024-09-07', status: 'Absent', hoursWorked: 0 },
          { date: '2024-09-08', status: 'Present', hoursWorked: 7 },
        ]
      };
      setWeeklyData(data);
    };
    fetchData();
  }, [sin]);

  if (!weeklyData) return <Typography>Loading...</Typography>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Weekly Attendance for SIN: {sin}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Weekly Summary</Typography>
                <Typography>Total Days: {weeklyData.totalDays}</Typography>
                <Typography>Present Days: {weeklyData.presentDays}</Typography>
                <Typography>Absent Days: {weeklyData.absentDays}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hoursWorked" fill="#8884d8" name="Hours Worked" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
        <Typography variant="h6">Daily Breakdown</Typography>
        <Grid container spacing={2}>
          {weeklyData.dailyData.map((day) => (
            <Grid item xs={12} sm={6} md={4} key={day.date}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">Date: {day.date}</Typography>
                  <Typography>Status: {day.status}</Typography>
                  <Typography>Hours Worked: {day.hoursWorked}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default WeeklyAttendance;