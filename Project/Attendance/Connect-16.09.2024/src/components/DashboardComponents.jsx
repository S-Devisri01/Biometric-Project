import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Divider } from "@mui/material";

const userProfile = {
  name: "John Doe",
  role: "Software Engineer",
  department: "Engineering",
  businessHours: "9 AM - 5 PM",
  currentDate: new Date().toLocaleDateString(),
};

const leaves = {
  atWork: 10,
  leaveTaken: 5,
  leaveBalance: 15,
};

const utilization = {
  percentage: "75%",
  totalWorkingDays: 20,
  organizationWorkingDays: 25,
};

const holidays = [
  { date: "2024-10-01", name: "National Holiday" },
  { date: "2024-12-25", name: "Christmas Day" },
];

const actions = [
  { date: "2024-09-10", message: "Completed project X" },
  { date: "2024-09-12", message: "Participated in team meeting" },
];

const DashboardComponents = () => {
  return (
    <Box sx={{ flexGrow: 1, ml: 2 }}>
      <Typography variant="h5" gutterBottom>
        My Dashboard
      </Typography>

      <Grid container spacing={2} className="grid-container">
        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="card">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: 56, height: 56, mr: 2 }} className="avatar">
                {userProfile.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{userProfile.name}</Typography>
                <Typography variant="body2">{userProfile.role}</Typography>
                <Typography variant="body2">
                  {userProfile.department}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption">
                  Business Hours: {userProfile.businessHours}
                </Typography>
                <Typography variant="caption">
                  {userProfile.currentDate}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Leave Info */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="card">
            <Typography variant="h6" gutterBottom>
              Leave Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box className="leaves">
              <Box className="leave-item">
                <Typography>At Work</Typography>
                <Typography variant="h6">{leaves.atWork}</Typography>
              </Box>
              <Box className="leave-item">
                <Typography>Leave Taken</Typography>
                <Typography variant="h6">{leaves.leaveTaken}</Typography>
              </Box>
              <Box className="leave-item">
                <Typography>Leave Balance</Typography>
                <Typography variant="h6">{leaves.leaveBalance}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Utilization */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="card">
            <Typography variant="h6" gutterBottom>
              Utilization
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box className="utilization-circle">
              <Typography variant="h6" className="percentage">
                {utilization.percentage}
              </Typography>
            </Box>
            <Typography className="time-off">
              Total Working Days: {utilization.totalWorkingDays}
            </Typography>
            <Typography className="time-off">
              Organization Working Days: {utilization.organizationWorkingDays}
            </Typography>
          </Paper>
        </Grid>

        {/* Holidays */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="card">
            <Typography variant="h6" gutterBottom>
              Upcoming Holidays
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {holidays.map((holiday, index) => (
              <Box key={index}>
                <Typography variant="body2">
                  {holiday.date} - {holiday.name}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Paper elevation={3} className="card">
            <Typography variant="h6" gutterBottom>
              Recent Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {actions.map((action, index) => (
              <Box key={index} className="actions">
                <Typography variant="body2">
                  {action.date}: {action.message}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardComponents;
