import React, { useState } from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const AttendanceView = () => {
  // State to hold the currently selected attendance view
  const [selectedView, setSelectedView] = useState("student"); // Default to student attendance

  // Function to handle the selection of attendance types
  const handleSelection = (view) => {
    setSelectedView(view);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Attendance View
      </Typography>
      <List>
        <ListItem button onClick={() => handleSelection("student")}>
          <ListItemText primary="Student Attendance" />
        </ListItem>
        <ListItem button onClick={() => handleSelection("personal")}>
          <ListItemText primary="Personal Attendance" />
        </ListItem>
      </List>

      {/* Conditional rendering of content based on selected view */}
      {selectedView === "student" && (
        <div>
          <Typography variant="h6">Student Attendance Content</Typography>
          {/* Add student attendance content here */}
        </div>
      )}
      {selectedView === "personal" && (
        <div>
          <Typography variant="h6">Personal Attendance Content</Typography>
          {/* Add personal attendance content here */}
        </div>
      )}
    </Paper>
  );
};

export default AttendanceView;
