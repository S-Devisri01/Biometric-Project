
import React, { useEffect, useState } from "react";
import {
  Drawer,
  // Grid,
  // Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Menu,
  Box,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//import LoginPage from "../components/LoginPage";
import LeaveApplicationForm from "../components/LeaveApplication";
import DashboardComponents from "../components/DashboardComponents";

// import SearchPage from "../components/SearchPage";
import LeaveApprovalStatus from "../components/LeaveApprovalStatus";
import WeeklyAttendance from "../components/WeeklyAttendance";


export const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Dashboard");
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const isProfileMenuOpen = Boolean(profileAnchorEl); 

  useEffect(() => {
    document.title = "SSCEI - Student Dashboard";
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleTabClick = (tab) => () => {
    setActiveTab(tab);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    setActiveTab("Profile");
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

  const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
  const emailPrefix = user.useremail ? user.useremail.split("@")[0] : "";

  return (
    <>

      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#f68f0",
          color: "blue",
          height: "64px",
        }}
      >
        <Toolbar>
          {!isDesktop && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* <img
            src={LoginImage}
            alt="Logo"
            style={{ width: 250, marginRight: "auto" }}
          /> */}
          <Typography variant="h6" style={{ color: "White", paddingRight: 15 }}>
            {emailPrefix}
          </Typography>
          <IconButton
            edge="end"
            color="White"
            aria-label="profile"
            onClick={handleProfileMenuOpen}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
            sx={{ mt: "45px" }}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {!isDesktop && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: 240,
            flexShrink: 0,
            zIndex: theme.zIndex.drawer,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#fff",
            },
          }}
        >
          <List sx={{ pt: 8 }}>
            <ListItem
              button
              selected={activeTab === "Dashboard"}
              onClick={handleTabClick("Dashboard")}
              sx={{
                bgcolor:
                  activeTab === "Dashboard"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Leave Application"}
              onClick={handleTabClick("Leave Application ")}
              sx={{
                bgcolor:
                  activeTab === "Leave Application"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Leave Application" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Attendance View"}
              onClick={handleTabClick("Attendance View")}
              sx={{
                bgcolor:
                  activeTab === "Attendance View"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Attendance View" />
            </ListItem>
            {/* <ListItem
              button
              selected={activeTab === "Incoming Request "}
              onClick={handleTabClick("Incoming Request ")}
              sx={{
                bgcolor:
                  activeTab === "Incoming Request "
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Incoming Request " />
            </ListItem> */}
            
          </List>
          <Divider />
          <List sx={{ mt: "auto" }}>
            <ListItem button onClick={handleLogoutClick}>
              <LogoutIcon sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      )
      }

      {isDesktop && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={true}
          sx={{
            width: 240,
            flexShrink: 0,
            zIndex: theme.zIndex.drawer,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#fff",
            },
          }}
        >
          <List sx={{ pt: 8 }}>
            <ListItem
              button
              selected={activeTab === "Dashboard"}
              onClick={handleTabClick("Dashboard")}
              sx={{
                bgcolor:
                  activeTab === "Dashboard"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Leave Application"}
              onClick={handleTabClick("Leave Application")}
              sx={{
                bgcolor:
                  activeTab === "Leave Application"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Leave Application" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Attendance View"}
              onClick={handleTabClick("Attendance View")}
              sx={{
                bgcolor:
                  activeTab === "Attendance View"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Attendance View" />
            </ListItem>
            {/* <ListItem
              button
              selected={activeTab === "Incoming Request "}
              onClick={handleTabClick("Incoming Request ")}
              sx={{
                bgcolor:
                  activeTab === "Incoming Request "
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Incoming Request " />
            </ListItem> */}
            <ListItem
              button
              selected={activeTab === "Leave Approval Status"}
              onClick={handleTabClick("Leave Approval Status")}
              sx={{
                bgcolor:
                  activeTab === "Leave Approval Status"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Leave Approval Status" />
            </ListItem>
          </List>
          <Divider />
          
          <List sx={{ mt: "auto" }}>
            <ListItem button onClick={handleLogoutClick}>
              <LogoutIcon sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      )}

<Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    marginTop: "64px",
    marginLeft: { xs: 0, md: "240px" },
    backgroundColor: "#fafafa",
  }}
>
  {activeTab === "Dashboard" && <DashboardComponents />}
  {activeTab === "Leave Application" && <LeaveApplicationForm />}

  {/* {activeTab === "Attendance View" && <DailyAttendance />}
  {activeTab === "Attendance View" && <MonthlyAttendance />}
   */}
  
  {activeTab === "Attendance View" && <WeeklyAttendance />}
  {activeTab === "Leave Approval Status" && <LeaveApprovalStatus /> }

  {/* Remove these lines, now they are managed by Routes in MainNavigator
  {activeTab === "Search" && <DailyAttendance />} 
  {activeTab === "Search" && <WeeklyAttendance />} 
  {activeTab === "Search" && <MonthlyAttendance />} */}
</Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
