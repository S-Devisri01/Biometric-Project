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
// import CancelIcon from "@mui/icons-material/Cancel";
// import PersonIcon from "@mui/icons-material/Person";

const StudentAttendance = () => {
  const { sin: initialSin } = useParams();
  const [searchSin, setSearchSin] = useState("");
  const [userDetails, setUserDetails] = useState({ sin: initialSin, name: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [isMonthlyView, setIsMonthlyView] = useState(true); // State to toggle views
  const [selectedWeek, setSelectedWeek] = useState(null); // State for selected week

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

  // const handleCancel = () => {
  //   navigate(-1); // Go back to the previous page
  // };

  const monthlyData = users[userDetails.sin] || defaultData;

  // Update dailyData to ensure an alternating pattern of present and absent
  const alternatingData = monthlyData.dailyData.map((day, index) => ({
    ...day,
    status: index % 2 === 0 ? "Present" : "Absent",
  }));

  // Dummy weekly data (for demonstration)
  const weeklyData = [
    { week: "Week 1", presentDays: 5, absentDays: 2, totalHoursWorked: 40 },
    { week: "Week 2", presentDays: 4, absentDays: 3, totalHoursWorked: 30 },
    { week: "Week 3", presentDays: 6, absentDays: 1, totalHoursWorked: 48 },
    { week: "Week 4", presentDays: 5, absentDays: 2, totalHoursWorked: 40 },
  ];

  // Create visual data for weekly attendance
  const weeklyAttendanceData = weeklyData.map((week, index) => ({
    week: week.week,
    present: week.presentDays,
    absent: week.absentDays,
  }));

  const handleCancel = () => {
    window.history.back(); // Navigate to the previous page
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 0 }}>
  <Typography variant="h4">Attendance </Typography>
  <Typography variant="h5">{monthlyData.name}</Typography>
  <Typography variant="h6">(SIN: {monthlyData.sin})</Typography>
</Box>




        <Box sx={{ display: "flex", alignItems: "center", gap: 2, p:2 }}>
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: '500px' }}>
          <Button
            variant={isMonthlyView ? "contained" : "outlined"}
            color="primary"
            onClick={() => setIsMonthlyView(true)}
          >
            Monthly Attendance
          </Button>
          <Button
            variant={!isMonthlyView ? "contained" : "outlined"}
            color="primary"
            onClick={() => setIsMonthlyView(false)}
          >
            Weekly Attendance
          </Button>
        </Box>

        {/* <IconButton
          onClick={handleCancel}
          color="primary"
          aria-label="reset page"
          sx={{ padding: 1 }}
        >
          <CancelIcon fontSize="large" />
        </IconButton> */}

        {/* <IconButton onClick={handleMenuOpen} color="primary">
          <Avatar>
            <PersonIcon />
          </Avatar>
        </IconButton> */}
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
        {/** Displaying Attendance Stats */}
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Days</Typography>
              <Typography variant="body1">{monthlyData.totalDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Present Days</Typography>
              <Typography variant="body1">{monthlyData.presentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Absent Days</Typography>
              <Typography variant="body1">{monthlyData.absentDays}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Hours Worked</Typography>
              <Typography variant="body1">{monthlyData.totalHoursWorked}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {isMonthlyView ? (
          <Grid item xs={12}>
            {/** Monthly Bar Chart */}
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
            <Grid container spacing={2}>
              {alternatingData.map((day) => {
                const dayOfWeek = getDay(new Date(day.date));
                const dayNames = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ];
                const bgColor =
                  dayOfWeek === 0 // Sunday
                    ? "#d8bfd8" // Light Red for Sunday
                    : day.status === "Present"
                    ? "#e0f7fa" // Light Blue for Present
                    : day.status === "Absent"
                    ? "#ffffe0" // Light Orange for Absent
                    : "#f4f4f9"; // Default background

                return (
                  <Grid item xs={12} sm={6} md={4} key={day.date}>
                    <Card sx={{ backgroundColor: bgColor }}>
                      <CardContent>
                        <Typography variant="h6">
                          {dayNames[dayOfWeek]} - {format(new Date(day.date), "dd/MM")}
                        </Typography>
                        <Typography variant="body2">
                          Status: {day.status}
                        </Typography>
                        <Typography variant="body2">
                          Hours Worked: {day.hoursWorked}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            {/** Weekly Attendance Details */}
            <Card>
              <CardContent>
                <Typography variant="h6">Weekly Attendance Summary</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#4caf50" name="Present Days" />
                    <Bar dataKey="absent" fill="#f44336" name="Absent Days" />
                  </BarChart>
                </ResponsiveContainer>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {weeklyData.map((week) => (
                    <Grid item xs={12} sm={6} md={3} key={week.week}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">{week.week}</Typography>
                          <Typography variant="body2">
                            Present Days: {week.presentDays}
                          </Typography>
                          <Typography variant="body2">
                            Absent Days: {week.absentDays}
                          </Typography>
                          <Typography variant="body2">
                            Total Hours Worked: {week.totalHoursWorked}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" color="primary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>

    </Box>



  );
};

export default StudentAttendance;
