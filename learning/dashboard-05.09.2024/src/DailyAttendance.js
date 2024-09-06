import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const DailyAttendance = () => {
  const { sin } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);

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

  if (!attendanceData) return <Typography>Loading...</Typography>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Daily Attendance for SIN: {sin}</Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">Date: {attendanceData.date}</Typography>
            <Typography>Status: {attendanceData.status}</Typography>
            <Typography>In Time: {attendanceData.inTime}</Typography>
            <Typography>Out Time: {attendanceData.outTime}</Typography>
          </CardContent>
        </Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[attendanceData]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hoursWorked" fill="#8884d8" name="Hours Worked" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </motion.div>
  );
};

export default DailyAttendance;