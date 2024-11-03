

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Menu,
  MenuItem,
  Grid,
  Paper,
  Avatar,
  Box,
  Divider,
  useTheme,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button,
} from "@mui/material";
import { ExpandLess, ExpandMore, Person as PersonIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Example Data for Dashboard
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
  percentage: "88%",
  totalWorkingDays: 23,
  organizationWorkingDays: 25,
};

const actions = [
  { date: "2024-10-10", message: "Completed" },
  { date: "2024-20-12", message: "Participated" },
];

const Dashboard = () => {
  const theme = useTheme(); // This will ensure 'theme' is defined
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const { logout } = useAuth();
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleToggleAttendance = () => {
    setAttendanceOpen(!attendanceOpen);
  };
  
  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate("/logout");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* App Bar */}
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {/* Dashboard */}
            </Typography>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <PersonIcon />
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
              open={isProfileMenuOpen}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
            <ListItem button onClick={() => ("/Dashboard")}>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button onClick={handleToggleAttendance}>
                <ListItemText primary="Attendance View" />
                {attendanceOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={attendanceOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }} onClick={() => navigate("/attendance/student")}>
                    <ListItemText primary="Student Attendance" />
                  </ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => navigate("/attendance/personal")}>
                    <ListItemText primary="Personal Attendance" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => navigate("/request-table")}>
                <ListItemText primary="Request Table" />
              </ListItem>
              <ListItem button onClick={() => navigate("/data")}>
                <ListItemText primary="Data" />
              </ListItem>
              <ListItem button onClick={() => navigate("/Staff-Leave-Request")}>
                <ListItemText primary="Staff Leave Request" />
              </ListItem>
              <ListItem button onClick={() => navigate("/Staff-LeaveApproval-Status")}>
                <ListItemText primary="Staff LeaveApproval Status" />
              </ListItem>
            </List>
            <Divider />
          </Box>

          <List sx={{ mt: "auto" }}>
            <ListItem button onClick={handleLogoutClick}>
              <LogoutIcon sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Dashboard Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            Welcome To Staff Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* Profile Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 8, borderRadius: 2 }}>
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
                    <Typography variant="caption">Business Hours: {userProfile.businessHours}</Typography>
                    <Typography variant="caption">{userProfile.currentDate}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Leave Information */}
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 9.2, borderRadius: 2 }}>
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

            {/* Utilization Information */}
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
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
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                      {utilization.percentage}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Total Working Days: {utilization.totalWorkingDays}
                  </Typography>
                  <Typography variant="body1">Organization Working Days: {utilization.organizationWorkingDays}</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Recent Actions */}
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 5.2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  Recent Actions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {actions.map((action, index) => (
                  <Box key={index} sx={{ mb: 1.5 }}>
                    <Typography variant="body2" color="textSecondary">
                      {action.date}
                    </Typography>
                    <Typography variant="body1">{action.message}</Typography>
                    {index !== actions.length - 1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
