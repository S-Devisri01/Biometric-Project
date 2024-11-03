import React from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const leaveRequests = [
  { id: 1, date: "2024-10-01", status: "Approved", approver: "Class Advisor" },
  { id: 2, date: "2024-10-02", status: "Pending", approver: "HoD" },
  { id: 3, date: "2024-10-03", status: "Rejected", approver: "Principal" },
  { id: 4, date: "2024-10-05", status: "Approved", approver: "Class Advisor" },
  { id: 5, date: "2024-10-07", status: "Pending", approver: "HoD" },
];

const LeaveApprovalStatus = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  const handleCancel = () => {
    window.history.back(); // Navigate to the previous page
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        maxWidth: 1000,
        margin: "auto",
        backgroundColor: "#f9f9fb",
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Leave Approval Status
      </Typography>

      {/* Approved Requests Section */}
      <Card sx={{ mb: 3, backgroundColor: "#e7f8e7" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Approved Requests
          </Typography>
          <Box>
            {leaveRequests
              .filter((request) => request.status === "Approved")
              .map((request) => (
                <Box
                  key={request.id}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}
                >
                  <Typography variant="body2">{`Request Date: ${request.date}`}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>{`Approver: ${request.approver}`}</Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>

      {/* Rejected Requests Section */}
      <Card sx={{ mb: 3, backgroundColor: "#f8e7e7" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Rejected Requests
          </Typography>
          <Box>
            {leaveRequests
              .filter((request) => request.status === "Rejected")
              .map((request) => (
                <Box
                  key={request.id}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}
                >
                  <Typography variant="body2">{`Request Date: ${request.date}`}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>{`Approver: ${request.approver}`}</Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>

      {/* Pending Requests Section */}
      <Card sx={{ mb: 3, backgroundColor: "#fff3cd" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pending Requests
          </Typography>
          <Box>
            {leaveRequests
              .filter((request) => request.status === "Pending")
              .map((request) => (
                <Box
                  key={request.id}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}
                >
                  <Typography variant="body2">{`Request Date: ${request.date}`}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>{`Approver: ${request.approver}`}</Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Box} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow
                key={request.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell align="center" sx={{ py: 2 }}>
                  {request.date}
                </TableCell>
                <TableCell align="center" sx={{ py: 2 }}>
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status)}
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      width: "80px",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cancel Button */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          sx={{ width: 120 }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default LeaveApprovalStatus;
