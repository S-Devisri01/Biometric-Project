import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";

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

// const holidays = [
//   { date: "2024-10-01", name: "National Holiday" },
//   { date: "2024-12-25", name: "Christmas Day" },
// ];

const actions = [
  { date: "2024-09-10", message: "Completed project X" },
  { date: "2024-09-12", message: "Participated in team meeting" },
];

const DashboardComponents = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 0 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
        Student Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Profile Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 6, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  backgroundColor: theme.palette.primary.main,
                  mr: 2,
                }}
              >
                {userProfile.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {userProfile.name}
                </Typography>
                <Typography variant="body1">{userProfile.role}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userProfile.department}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" display="block">
                  Business Hours: {userProfile.businessHours}
                </Typography>
                <Typography variant="caption" display="block">
                  {userProfile.currentDate}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Leave Info */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 8.5, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Leave Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography variant="body1">At Work</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {leaves.atWork}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography variant="body1">Leave Taken</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {leaves.leaveTaken}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography variant="body1">Leave Balance</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {leaves.leaveBalance}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Utilization */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 1.8, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Utilization
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: `4px solid ${theme.palette.primary.main}`,
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                >
                  {utilization.percentage}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ mt: 2, color: theme.palette.text.secondary }}
              >
                Total Working Days: {utilization.totalWorkingDays}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Organization Working Days: {utilization.organizationWorkingDays}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Actions */}
        <Grid item xs={6}>
          <Paper elevation={4} sx={{ p: 8.5, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Recent Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {actions.map((action, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <strong>{action.date}:</strong> {action.message}
                </Typography>
                {index !== actions.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardComponents;
