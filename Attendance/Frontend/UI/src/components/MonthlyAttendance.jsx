// // import React, { useEffect, useState } from 'react';
// // import { useParams, useHistory } from 'react-router-dom';
// // import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
// // import CancelIcon from '@mui/icons-material/Cancel';

// // const MonthlyAttendance = () => {
// //   const { sin } = useParams();
// //   const [monthlyData, setMonthlyData] = useState(null);
// //   const history = useHistory();

// //   useEffect(() => {
// //     // Fetch monthly attendance data for the given SIN
// //     // This is a placeholder, replace with actual API call
// //     const fetchData = async () => {
// //       const currentDate = new Date();
// //       const monthStart = startOfMonth(currentDate);
// //       const monthEnd = endOfMonth(currentDate);
// //       const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

// //       const data = {
// //         totalDays: daysInMonth.length,
// //         presentDays: 22,
// //         absentDays: 6,
// //         holidayDays: 2,
// //         dailyData: daysInMonth.map(day => ({
// //           date: format(day, 'yyyy-MM-dd'),
// //           status: Math.random() > 0.2 ? 'Present' : Math.random() > 0.5 ? 'Absent' : 'Holiday',
// //           hoursWorked: Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 5 : 0,
// //         }))
// //       };
// //       setMonthlyData(data);
// //     };
// //     fetchData();
// //   }, [sin]);

// //   const handleBack = () => {
// //     history.push('/');
// //   };

// //   if (!monthlyData) return <Typography>Loading...</Typography>;

// //   return (
// //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //         <Typography variant="h5">Monthly Attendance for SIN: {sin}</Typography>
// //         <IconButton 
// //           onClick={handleBack} 
// //           color="primary" 
// //           aria-label="back to search"
// //           sx={{ padding: 1 }}
// //         >
// //           <CancelIcon fontSize="large" />
// //         </IconButton>
// //       </Box>
// //       <Grid container spacing={2}>
// //         <Grid item xs={12} md={3}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6">Total Days</Typography>
// //               <Typography>{monthlyData.totalDays}</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} md={3}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6">Present Days</Typography>
// //               <Typography>{monthlyData.presentDays}</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} md={3}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6">Absent Days</Typography>
// //               <Typography>{monthlyData.absentDays}</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} md={3}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6">Holiday Days</Typography>
// //               <Typography>{monthlyData.holidayDays}</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //       <Card>
// //         <CardContent>
// //           <Typography variant="h6">Monthly Attendance Overview</Typography>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={monthlyData.dailyData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis 
// //                 dataKey="date" 
// //                 tickFormatter={(tick) => format(new Date(tick), 'dd')}
// //                 interval={2}
// //               />
// //               <YAxis />
// //               <Tooltip 
// //                 labelFormatter={(label) => format(new Date(label), 'dd-MMM-yyyy')}
// //                 formatter={(value, name) => [value, name === 'hoursWorked' ? 'Hours Worked' : name]}
// //               />
// //               <Legend />
// //               <Bar dataKey="hoursWorked" fill="#8884d8" name="Hours Worked" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </CardContent>
// //       </Card>
// //       <Typography variant="h6">Daily Breakdown</Typography>
// //       <Grid container spacing={2}>
// //         {monthlyData.dailyData.map((day) => (
// //           <Grid item xs={6} sm={4} md={2} key={day.date}>
// //             <Card sx={{ 
// //               bgcolor: day.status === 'Present' ? '#e8f5e9' : 
// //                        day.status === 'Absent' ? '#ffebee' : '#e3f2fd'
// //             }}>
// //               <CardContent>
// //                 <Typography variant="subtitle2">{format(new Date(day.date), 'dd-MMM')}</Typography>
// //                 <Typography variant="body2">Status: {day.status}</Typography>
// //                 <Typography variant="body2">Hours: {day.hoursWorked}</Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default MonthlyAttendance;



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Grid,
//   IconButton,
// } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
// import CancelIcon from "@mui/icons-material/Cancel";

// const MonthlyAttendance = () => {
//   const { sin } = useParams();
//   const [monthlyData, setMonthlyData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch monthly attendance data for the given SIN
//     const fetchData = async () => {
//       const currentDate = new Date();
//       const monthStart = startOfMonth(currentDate);
//       const monthEnd = endOfMonth(currentDate);
//       const daysInMonth = eachDayOfInterval({
//         start: monthStart,
//         end: monthEnd,
//       });

//       const data = {
//         totalDays: daysInMonth.length,
//         presentDays: 20, // Placeholder value, replace with actual data
//         absentDays: 6, // Placeholder value, replace with actual data
//         holidayDays: 2, // Placeholder value, replace with actual data
//         dailyData: daysInMonth.map((day) => ({
//           date: format(day, "yyyy-MM-dd"),
//           status:
//             Math.random() > 0.2
//               ? "Present"
//               : Math.random() > 0.5
//               ? "Absent"
//               : "Holiday",
//           hoursWorked:
//             Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 5 : 0,
//         })),
//       };
//       setMonthlyData(data);
//     };
//     fetchData();
//   }, [sin]);

//   const handleBack = () => {
//     navigate("/");
//   };

//   if (!monthlyData) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h5">Monthly Attendance for SIN: {sin}</Typography>
//         <IconButton
//           onClick={handleBack}
//           color="primary"
//           aria-label="back to search"
//           sx={{ padding: 1 }}
//         >
//           <CancelIcon fontSize="large" />
//         </IconButton>
//       </Box>
//       <Grid container spacing={2}>
//         <Grid item xs={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Days</Typography>
//               <Typography>{monthlyData.totalDays}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Present Days</Typography>
//               <Typography>{monthlyData.presentDays}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Absent Days</Typography>
//               <Typography>{monthlyData.absentDays}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Holiday Days</Typography>
//               <Typography>{monthlyData.holidayDays}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <Card>
//         <CardContent>
//           <Typography variant="h6">Monthly Attendance Overview</Typography>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={monthlyData.dailyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="date"
//                 tickFormatter={(tick) => format(new Date(tick), "dd")}
//                 interval={0}
//               />
//               <YAxis />
//               <Tooltip
//                 labelFormatter={(label) =>
//                   format(new Date(label), "dd-MMM-yyyy")
//                 }
//                 formatter={(value, name) => [
//                   value,
//                   name === "hoursWorked" ? "Hours Worked" : name,
//                 ]}
//               />
//               <Legend />
//               <Bar dataKey="hoursWorked" fill="#8884d8" name="Hours Worked" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//       <Typography variant="h6">Daily Breakdown</Typography>
//       <Grid container spacing={2}>
//         {monthlyData.dailyData.map((day) => (
//           <Grid item xs={6} sm={4} md={2} key={day.date}>
//             <Card
//               sx={{
//                 bgcolor:
//                   day.status === "Present"
//                     ? "#e8f5e9"
//                     : day.status === "Absent"
//                     ? "#ffebee"
//                     : "#e3f2fd",
//               }}
//             >
//               <CardContent>
//                 <Typography variant="subtitle2">
//                   {format(new Date(day.date), "dd-MMM")}
//                 </Typography>
//                 <Typography variant="body2">Status: {day.status}</Typography>
//                 <Typography variant="body2">
//                   Hours: {day.hoursWorked}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default MonthlyAttendance;
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Button,
  TextField,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, getDay } from "date-fns"; // Import getDay to get the day of the week
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";

const MonthlyAttendance = () => {
  const { sin: initialSin } = useParams();
  const [searchSin, setSearchSin] = useState("");
  const [userDetails, setUserDetails] = useState({ sin: initialSin, name: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const users = {
    "12345": {
      name: "John Doe",
      sin: "12345",
      totalDays: 30,
      presentDays: 24,
      absentDays: 6,
      totalHoursWorked: 180,
      dailyData: Array.from({ length: 30 }, (_, index) => ({
        date: `2024-09-${String(index + 1).padStart(2, "0")}`,
        status: index % 2 === 0 ? "Present" : "Absent",
        hoursWorked: index % 2 === 0 ? (8 + Math.random() * 2).toFixed(2) : 0,
      })),
    },
    "67890": {
      name: "Jane Smith",
      sin: "67890",
      totalDays: 30,
      presentDays: 27,
      absentDays: 3,
      totalHoursWorked: 220,
      dailyData: Array.from({ length: 30 }, (_, index) => ({
        date: `2024-09-${String(index + 1).padStart(2, "0")}`,
        status: index % 2 === 0 ? "Present" : "Absent",
        hoursWorked: index % 2 === 0 ? (8 + Math.random() * 2).toFixed(2) : 0,
      })),
    },
  };

  const defaultData = users[initialSin] || users["12345"];

  const handleSearch = () => {
    const foundUser = Object.values(users).find(
      (user) =>
        user.sin === searchSin || user.name.toLowerCase() === searchSin.toLowerCase()
    );
    if (foundUser) {
      setUserDetails({ sin: foundUser.sin, name: foundUser.name });
    } else {
      alert("User not found!");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDailyAttendance = () => {
    navigate(`/DailyAttendance/${userDetails.sin}`);
  };
  const handleWeeklyAttendance = () => {
    navigate(`/WeeklyAttendance/${userDetails.sin}`);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const monthlyData = users[userDetails.sin] || defaultData;

  // Update dailyData to ensure an alternating pattern of present and absent
  const alternatingData = monthlyData.dailyData.map((day, index) => ({
    ...day,
    status: index % 2 === 0 ? "Present" : "Absent",
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          Monthly Attendance for {monthlyData.name} (SIN: {monthlyData.sin})
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            label="Search by SIN or Name"
            variant="outlined"
            size="small"
            value={searchSin}
            onChange={(e) => setSearchSin(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDailyAttendance}
          >
            Daily Attendance
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWeeklyAttendance}
          >
            Weekly Attendance
          </Button>
        </Box>

        <IconButton
          onClick={handleCancel}
          color="primary"
          aria-label="reset page"
          sx={{ padding: 1 }}
        >
          <CancelIcon fontSize="large" />
        </IconButton>

        <IconButton onClick={handleMenuOpen} color="primary">
          <Avatar>
            <PersonIcon />
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Attendance Dashboard</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Days</Typography>
              <Typography>{monthlyData.totalDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Present Days</Typography>
              <Typography>{monthlyData.presentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Absent Days</Typography>
              <Typography>{monthlyData.absentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Hours Worked</Typography>
              <Typography>{monthlyData.totalHoursWorked}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly Hours Worked</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(tick) => format(new Date(tick), "dd-MMM")}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) =>
                      format(new Date(label), "dd-MMM-yyyy")
                    }
                  />
                  <Legend />
                  <Bar
                    dataKey="hoursWorked"
                    fill="#8884d8"
                    name="Hours Worked"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Daily Breakdown
          </Typography>
          <Grid container spacing={2}>
            {alternatingData.map((day) => {
              const dayOfWeek = getDay(new Date(day.date)); // Get the day of the week
              const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
              let bgColor = "";
              switch (day.status) {
                case "Present":
                  bgColor = "#d4edda"; // Light green for present
                  break;
                case "Absent":
                  bgColor = "#f8d7da"; // Light red for absent
                  break;
                default:
                  bgColor = "#fff3cd"; // Default yellow
              }

              return (
                <Grid item xs={6} md={3} key={day.date}>
                  <Card sx={{ backgroundColor: bgColor }}>
                    <CardContent>
                      <Typography variant="subtitle1">
                        Date: {format(new Date(day.date), "dd-MMM-yyyy")} ({dayNames[dayOfWeek]})
                      </Typography>
                      <Typography>Status: {day.status}</Typography>
                      <Typography>Hours Worked: {day.hoursWorked}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyAttendance;
