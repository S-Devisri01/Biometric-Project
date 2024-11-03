import React from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";

const attendanceData = [
  { studentName: "John Doe", attendance: "Present", date: "2024-10-01" },
  { studentName: "Jane Smith", attendance: "Absent", date: "2024-10-01" },
  { studentName: "Alice Johnson", attendance: "Present", date: "2024-10-01" },
  { studentName: "Bob Brown", attendance: "Present", date: "2024-10-02" },
  { studentName: "Charlie Green", attendance: "Late", date: "2024-10-02" },
  // Add more attendance records as needed
];

const TOTAL_STUDENTS = 100;
const totalPresent = attendanceData.filter(item => item.attendance === 'Present').length;
const totalAbsent = attendanceData.filter(item => item.attendance === 'Absent').length;
const totalLate = attendanceData.filter(item => item.attendance === 'Late').length;
const averageAttendance = ((totalPresent / TOTAL_STUDENTS) * 100).toFixed(2);

const DataPage = () => {
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 4,
          maxWidth: "1000px",
          margin: "20px",
          borderRadius: "10px",
          boxShadow: 6,
          backgroundColor: "#f1f6fa",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Attendance Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={4}>
            <Typography variant="h6">Total Students:</Typography>
            <Typography variant="body1">{TOTAL_STUDENTS}</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h6">Total Attendance Records:</Typography>
            <Typography variant="body1">{attendanceData.length}</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h6">Total Present:</Typography>
            <Typography variant="body1" color="success.main">{totalPresent}</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h6">Total Absent:</Typography>
            <Typography variant="body1" color="error.main">{totalAbsent}</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h6">Total Late:</Typography>
            <Typography variant="body1" color="warning.main">{totalLate}</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h6">Average Attendance:</Typography>
            <Typography variant="body1">{averageAttendance}%</Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Attendance Details
        </Typography>
        <Box sx={{ overflowX: "auto", mb: 4 }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#ffffff",
            }}
          >
            <Box component="thead" sx={{ backgroundColor: "#1976d2" }}>
              <Box component="tr">
                <Box component="th" sx={{ color: "#fff", padding: "12px", fontWeight: "bold" }}>
                  Student Name
                </Box>
                <Box component="th" sx={{ color: "#fff", padding: "12px", fontWeight: "bold" }}>
                  Attendance
                </Box>
                <Box component="th" sx={{ color: "#fff", padding: "12px", fontWeight: "bold" }}>
                  Date
                </Box>
              </Box>
            </Box>
            <Box component="tbody">
              {attendanceData.map((record, index) => (
                <Box
                  component="tr"
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#f1f6fa",
                    "&:hover": { backgroundColor: "#eaf4fd" },
                  }}
                >
                  <Box component="td" sx={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                    {record.studentName}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                      color: record.attendance === "Absent" ? "error.main" : record.attendance === "Late" ? "warning.main" : "text.primary",
                    }}
                  >
                    {record.attendance}
                  </Box>
                  <Box component="td" sx={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                    {record.date}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" onClick={handleCancel} sx={{ mt: 3 }}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataPage;
