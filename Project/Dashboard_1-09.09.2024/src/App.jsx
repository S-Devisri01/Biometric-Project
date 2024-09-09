// import {
//   BrowserRouter,
//   Navigate,
//   Outlet,
//   Route,
//   Routes,
// } from "react-router-dom";
// import "./App.css";
// import { LoginPage } from "./login/login.js";
// import { HodDashboardPage } from "./dashboard/hod-dashboard.js";
// import { StaffDashboardPage } from "./dashboard/staff-dashboard.js";
// import { LayoutPage } from "./layout/layout.js";
// import { LeaveApprovalHod } from "./leave-approval/leave-approval-hod.js";
// import { LeaveForm } from "./form/leave-form.js";
// import { ProfilePage } from "./profile/profile.js";
// import { OutPassForm } from "./form/out-pass-form.js";

// function App() {
//   return (
//     <div >
//       <BrowserRouter basename={`/`}>
//         <Routes>
//           <Route path="/" element={<Outlet />}>
//             <Route index element={<Navigate to={"/login"} />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/app" element={<LayoutPage />}>
//               <Route path="dashboard" element={<HodDashboardPage />} />
//               <Route path="dashboard-staff" element={<StaffDashboardPage />} />
//               <Route path="leave-approval-hod" element={<LeaveApprovalHod />} />
//               <Route path="leave-form" element={<LeaveForm />} />
//               <Route path="out-pass-form" element={<OutPassForm />} />
//               <Route path="profile" element={<ProfilePage />} />
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated to Routes
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import SearchPage from "./SearchPage";
import DailyAttendance from "./DailyAttendance";
import WeeklyAttendance from "./WeeklyAttendance";
import MonthlyAttendance from "./MonthlyAttendance";
import "./App.css";
import logo from "./assets/logo.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src={logo}
                alt="logo"
                style={{ height: "50px", width: "auto" }}
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/daily/:sin" element={<DailyAttendance />} />
              <Route path="/weekly/:sin" element={<WeeklyAttendance />} />
              <Route path="/monthly/:sin" element={<MonthlyAttendance />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
