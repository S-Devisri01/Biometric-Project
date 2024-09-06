import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const MonthlyAttendance = () => {
  const { sin } = useParams();
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    // Fetch monthly attendance data for the given SIN
    // This is a placeholder, replace with actual API call
    const fetchData = async () => {
      const data = {
        totalDays: 30,
        presentDays: 22,
        absentDays: 6,
        holidayDays: 2,
        dailyData: Array.from({ length: 30 }, (_, i) => ({
          date: `2024-09-${String(i + 1).padStart(2, '0')}`,
          status: Math.random() > 0.2 ? 'Present' : Math.random() > 0.5 ? 'Absent' : 'Holiday',
        }))
      };
      setMonthlyData(data);
    };
    fetchData();
  }, [sin]);

  if (!monthlyData) return <Typography>Loading...</Typography>;

  const pieData = [
    { name: 'Present', value: monthlyData.presentDays, color: '#4caf50' },
    { name: 'Absent', value: monthlyData.absentDays, color: '#f44336' },
    { name: 'Holiday', value: monthlyData.holidayDays, color: '#2196f3' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4">Monthly Attendance for SIN: {sin}</Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Monthly Summary</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body1">Total Days: {monthlyData.totalDays}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body1">Present Days: {monthlyData.presentDays}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body1">Absent Days: {monthlyData.absentDays}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body1">Holiday Days: {monthlyData.holidayDays}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Attendance Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Calendar View</Typography>
          <Grid container spacing={1}>
            {monthlyData.dailyData.map((day) => (
              <Grid item xs={1} key={day.date}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    bgcolor: 
                      day.status === 'Present' ? '#4caf50' : 
                      day.status === 'Absent' ? '#f44336' : '#2196f3',
                    color: 'white',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s'
                    }
                  }}
                >
                  <Typography variant="body2">{day.date.split('-')[2]}</Typography>
                  <Typography variant="caption">{day.status[0]}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MonthlyAttendance;