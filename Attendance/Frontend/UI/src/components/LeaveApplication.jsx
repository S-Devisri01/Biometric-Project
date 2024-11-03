// import { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   TextField,
//   MenuItem,
//   FormControl,
//   Snackbar,
//   Alert,
//   IconButton,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Container,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";

// // Simulate fetching user leave data from an API or database
// const initialLeaveBalance = {
//   casualLeave: 5,
//   sickLeave: 3,
//   festivalLeave: 2,
//   od: 5,
//   internship: Infinity,
// };

// const alreadyTakenLeave = {
//   casualLeave: 2,
//   sickLeave: 1,
//   festivalLeave: 0,
//   od: 1,
//   internship: 2,
// };

// const leaveTypes = [
//   { value: "Leave", label: "Leave" },
//   { value: "OD", label: "OD" },
//   { value: "Internship", label: "Internship" },
// ];

// const leaveReasons = [
//   { value: "Casual Leave", label: "Casual Leave" },
//   { value: "Sick Leave", label: "Sick Leave" },
//   { value: "Festival Leave", label: "Festival Leave" },
//   { value: "Other", label: "Other" },
// ];

// function LeaveApplicationForm() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const [formData, setFormData] = useState({
//     name: "",
//     sinNumber: "",
//     email: "",
//     reason: "",
//     otherReason: "",
//     odReason: "",
//     startDate: "",
//     endDate: "",
//     duration: "",
//   });

//   const [leaveType, setLeaveType] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [leaveBalance, setLeaveBalance] = useState({
//     casualLeave: initialLeaveBalance.casualLeave - alreadyTakenLeave.casualLeave,
//     sickLeave: initialLeaveBalance.sickLeave - alreadyTakenLeave.sickLeave,
//     festivalLeave: initialLeaveBalance.festivalLeave - alreadyTakenLeave.festivalLeave,
//     od: initialLeaveBalance.od - alreadyTakenLeave.od,
//     internship: initialLeaveBalance.internship,
//   });
//   const [isFormSubmittedToday, setIsFormSubmittedToday] = useState(false);

//   const calculateDuration = (startDate, endDate) => {
//     if (!startDate || !endDate) return 0;

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffInTime = end - start;
//     return Math.ceil(diffInTime / (1000 * 60 * 60 * 24)) + 1;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     if (name === "leaveType") {
//       setLeaveType(value);
//     }

//     if (name === "reason") {
//       setFormData((prevData) => ({
//         ...prevData,
//         reason: value,
//         otherReason: value === "Other" ? prevData.otherReason : "",
//       }));
//     }

//     if (name === "startDate" || name === "endDate") {
//       const duration = calculateDuration(
//         name === "startDate" ? value : formData.startDate,
//         name === "endDate" ? value : formData.endDate
//       );
//       setFormData((prevData) => ({
//         ...prevData,
//         duration: duration,
//       }));
//     }
//   };

//   const validateForm = () => {
//     const duration = formData.duration;

//     if (
//       !formData.name ||
//       !formData.sinNumber ||
//       !formData.email ||
//       !formData.startDate ||
//       !formData.endDate
//     ) {
//       setSnackbarMessage("Please fill all required fields.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (leaveType === "Leave" && !formData.reason) {
//       setSnackbarMessage("Please select a reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Other" && !formData.otherReason) {
//       setSnackbarMessage("Please provide the other reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (
//       (leaveType === "OD" || leaveType === "Internship" || leaveType === "Leave") &&
//       !formData.odReason
//     ) {
//       setSnackbarMessage("Please provide a reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setSnackbarMessage("Invalid email format.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Casual Leave" && duration > leaveBalance.casualLeave) {
//       setSnackbarMessage("Insufficient Casual Leave balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Sick Leave" && duration > leaveBalance.sickLeave) {
//       setSnackbarMessage("Insufficient Sick Leave balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Festival Leave" && duration > leaveBalance.festivalLeave) {
//       setSnackbarMessage("Insufficient Festival Leave balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (leaveType === "OD" && duration > leaveBalance.od) {
//       setSnackbarMessage("Insufficient OD balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isFormSubmittedToday) {
//       setSnackbarMessage("You have already submitted the form today.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const duration = formData.duration;

//     if (formData.reason === "Casual Leave") {
//       setLeaveBalance((prev) => ({ ...prev, casualLeave: prev.casualLeave - duration }));
//     } else if (formData.reason === "Sick Leave") {
//       setLeaveBalance((prev) => ({ ...prev, sickLeave: prev.sickLeave - duration }));
//     } else if (formData.reason === "Festival Leave") {
//       setLeaveBalance((prev) => ({ ...prev, festivalLeave: prev.festivalLeave - duration }));
//     } else if (leaveType === "OD") {
//       setLeaveBalance((prev) => ({ ...prev, od: prev.od - duration }));
//     }

//     setSnackbarMessage(`${leaveType} form successfully submitted.`);
//     setSnackbarSeverity("success");
//     setSnackbarOpen(true);
//     setIsFormSubmittedToday(true);
//   };

//   return (
//     <Box>
//       <AppBar color="primary">
//         <Toolbar className="head">
//           <Typography variant="h6">Leave Application</Typography>
//           <div className="icon" color="inherit">
//             <IconButton color="inherit">
//               <CancelIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>

//       <Container sx={{ mb: 2, mt: 3, p: 2 }}>
//         <Box sx={{ mb: 3, mt: 2 }}>
//           <FormControl fullWidth>
//             <Typography variant="h6">Select Form Type</Typography>
//             <TextField
//               select
//               name="leaveType"
//               label="Form Type"
//               value={leaveType}
//               onChange={handleChange}
//               fullWidth
//               variant="outlined"
//             >
//               {leaveTypes.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </FormControl>

//           <Box
//             sx={{
//               mb: 2,
//               mt: 2,
//               p: 2,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box sx={{ flex: 1, textAlign: "right" }}>
//               {leaveType === "Leave" && formData.reason && (
//                 <Typography variant="body1">
//                   Leave Balance for {formData.reason}:{" "}
//                   {formData.reason === "Casual Leave" && leaveBalance.casualLeave}
//                   {formData.reason === "Sick Leave" && leaveBalance.sickLeave}
//                   {formData.reason === "Festival Leave" && leaveBalance.festivalLeave}
//                 </Typography>
//               )}
//               {leaveType === "OD" && (
//                 <Typography variant="body1">
//                   OD Balance: {leaveBalance.od}
//                 </Typography>
//               )}
//               {leaveType === "Internship" && (
//                 <Typography variant="body1">
//                   Internship Days Taken: {alreadyTakenLeave.internship}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Box>

//         <Card>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     name="name"
//                     label="Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     name="sinNumber"
//                     label="Sin Number"
//                     value={formData.sinNumber}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     name="email"
//                     label="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 {leaveType === "Leave" && (
//                   <Grid item xs={12}>
//                     <TextField
//                       select
//                       name="reason"
//                       label="Reason"
//                       value={formData.reason}
//                       onChange={handleChange}
//                       fullWidth
//                       required
//                     >
//                       {leaveReasons.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.label}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                 )}

//                 {formData.reason === "Other" && (
//                   <Grid item xs={12}>
//                     <TextField
//                       name="otherReason"
//                       label="Other Reason"
//                       value={formData.otherReason}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                   </Grid>
//                 )}

//                 {(leaveType === "OD" || leaveType === "Internship") && (
//                   <Grid item xs={12}>
//                     <TextField
//                       name="odReason"
//                       label="Reason for OD/Internship"
//                       value={formData.odReason}
//                       onChange={handleChange}
//                       fullWidth
//                       required
//                     />
//                   </Grid>
//                 )}

//                 <Grid item xs={12}>
//                   <TextField
//                     name="startDate"
//                     label="Start Date"
//                     type="date"
//                     value={formData.startDate}
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     name="endDate"
//                     label="End Date"
//                     type="date"
//                     value={formData.endDate}
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     name="duration"
//                     label="Duration (days)"
//                     value={formData.duration}
//                     fullWidth
//                     disabled
//                     InputProps={{ readOnly: true }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                   >
//                     Submit
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </CardContent>
//         </Card>
//       </Container>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default LeaveApplicationForm;


// import { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   TextField,
//   MenuItem,
//   FormControl,
//   Snackbar,
//   Alert,
//   IconButton,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Container,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
// // import img from "./assets/logo.png";
// // import "./App.css";

// // Simulate fetching user leave data from an API or database
// const initialLeaveBalance = {
//   casualLeave: 5,
//   sickLeave: 3,
//   festivalLeave: 2,
//   od: 5,
//   internship: Infinity,
// };

// const alreadyTakenLeave = {
//   casualLeave: 2,
//   sickLeave: 1,
//   festivalLeave: 0,
//   od: 1,
//   internship: 2,
// };

// const leaveTypes = [
//   { value: "Leave", label: "Leave" },
//   { value: "OD", label: "OD" },
//   { value: "Internship", label: "Internship" },
// ];

// const leaveReasons = [
//   { value: "Casual Leave", label: "Casual Leave" },
//   { value: "Sick Leave", label: "Sick Leave" },
//   { value: "Festival Leave", label: "Festival Leave" },
//   { value: "Other", label: "Other" },
// ];

// function LeaveApplicationForm() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const [formData, setFormData] = useState({
//     name: "",
//     sinNumber: "",
//     email: "",
//     reason: "",
//     otherReason: "",
//     odReason: "",
//     startDate: "",
//     endDate: "",
//     duration: "",
//   });

//   const [leaveType, setLeaveType] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [leaveBalance, setLeaveBalance] = useState({
//     casualLeave: initialLeaveBalance.casualLeave - alreadyTakenLeave.casualLeave,
//     sickLeave: initialLeaveBalance.sickLeave - alreadyTakenLeave.sickLeave,
//     festivalLeave: initialLeaveBalance.festivalLeave - alreadyTakenLeave.festivalLeave,
//     od: initialLeaveBalance.od - alreadyTakenLeave.od,
//     internship: initialLeaveBalance.internship,
//   });
//   const [isFormSubmittedToday, setIsFormSubmittedToday] = useState(false);

//   const calculateDuration = (startDate, endDate) => {
//     if (!startDate || !endDate) return 0;

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffInTime = end - start;
//     return Math.ceil(diffInTime / (1000 * 60 * 60 * 24)) + 1;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     if (name === "leaveType") {
//       setLeaveType(value);
//     }

//     if (name === "reason") {
//       setFormData((prevData) => ({
//         ...prevData,
//         reason: value,
//         otherReason: value === "Other" ? prevData.otherReason : "",
//       }));
//     }

//     if (name === "startDate" || name === "endDate") {
//       const duration = calculateDuration(
//         name === "startDate" ? value : formData.startDate,
//         name === "endDate" ? value : formData.endDate
//       );
//       setFormData((prevData) => ({
//         ...prevData,
//         duration: duration,
//       }));
//     }
//   };

//   const validateForm = () => {
//     const duration = formData.duration;

//     if (
//       !formData.name ||
//       !formData.sinNumber ||
//       !formData.email ||
//       !formData.startDate ||
//       !formData.endDate
//     ) {
//       setSnackbarMessage("Please fill all required fields.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (leaveType === "Leave" && !formData.reason) {
//       setSnackbarMessage("Please select a reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Other" && !formData.otherReason) {
//       setSnackbarMessage("Please provide the other reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Casual Leave" && !formData.otherReason) {
//       setSnackbarMessage("Please provide the other reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Sick Leave" && !formData.otherReason) {
//       setSnackbarMessage("Please provide the other reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Festival Leave" && !formData.otherReason) {
//       setSnackbarMessage("Please provide the other reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (
//       (leaveType === "OD" || leaveType === "Internship" || leaveType === "Leave") &&
//       !formData.odReason
//     ) {
//       setSnackbarMessage("Please provide a reason.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setSnackbarMessage("Invalid email format.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Casual Leave" && duration > leaveBalance.casualLeave) {
//       setSnackbarMessage("Insufficient Casual Leave balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Sick Leave" && duration > leaveBalance.sickLeave) {
//       setSnackbarMessage("Insufficient Sick Leave balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (formData.reason === "Festival Leave" && duration > leaveBalance.festivalLeave) {
//       setSnackbarMessage("Insufficient Festival Leave balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     if (leaveType === "OD" && duration > leaveBalance.od) {
//       setSnackbarMessage("Insufficient OD balance.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isFormSubmittedToday) {
//       setSnackbarMessage("You have already submitted the form today.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const duration = formData.duration;

//     if (formData.reason === "Casual Leave") {
//       setLeaveBalance((prev) => ({ ...prev, casualLeave: prev.casualLeave - duration }));
//     } else if (formData.reason === "Sick Leave") {
//       setLeaveBalance((prev) => ({ ...prev, sickLeave: prev.sickLeave - duration }));
//     } else if (formData.reason === "Festival Leave") {
//       setLeaveBalance((prev) => ({ ...prev, festivalLeave: prev.festivalLeave - duration }));
//     } else if (leaveType === "OD") {
//       setLeaveBalance((prev) => ({ ...prev, od: prev.od - duration }));
//     }

//     setSnackbarMessage(`${leaveType} form successfully submitted.`);
//     setSnackbarSeverity("success");
//     setSnackbarOpen(true);
//     setIsFormSubmittedToday(true);
//   };

//   return (
//     <Box>
//       <AppBar color="primary">
//         <Toolbar className="head">
//           {/* <Typography variant="h6">
//             <img src={img} alt="img" />
//           </Typography> */}
//           <div className="icon" color="inherit">
//             <IconButton color="inherit">
//               <CancelIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth sx={{ mb: 2, mt: 3, p: 2 }}>
//   <Box sx={{ mb: 3, mt: 2 }}>
//     <FormControl fullWidth>
//       <Typography variant="h6">Select Form Type</Typography>
//       <TextField
//         select
//         name="leaveType"
//         label="Form Type"
//         value={leaveType}
//         onChange={handleChange}
//         fullWidth
//         variant="outlined"
//       >
//         {leaveTypes.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField>
//     </FormControl>

//     {/* Conditionally render the leave/OD balance based on the selected leaveType */}
//     <Box
//       sx={{
//         mb: 2,
//         mt: 2,
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >
//       {/* Render leave balance on the right side */}
//       <Box sx={{ flex: 1, textAlign: "right" }}>
//         {leaveType === "Leave" && formData.reason && (
//           <Typography variant="body1">
//             Leave Balance for {formData.reason}:{" "}
//             {formData.reason === "Casual Leave" && leaveBalance.casualLeave}
//             {formData.reason === "Sick Leave" && leaveBalance.sickLeave}
//             {formData.reason === "Festival Leave" && leaveBalance.festivalLeave}
//           </Typography>
//         )}
//         {leaveType === "OD" && (
//           <Typography variant="body1">OD Balance: {leaveBalance.od}</Typography>
//         )}
//         {leaveType === "Internship" && (
//           <Typography variant="body1">
//             Internship Balance: {leaveBalance.internship}
//           </Typography>
//         )}
//       </Box>
//     </Box>

//     {/* Leave form */}
//     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//       <Card
//         sx={{
//           display: "inline-block",
//           width: isSmallScreen ? "100%" : "45%",
//           mb: 2,
//         }}
//       >
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Sin Number"
//                 name="sinNumber"
//                 value={formData.sinNumber}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             {/* Conditionally render the "Reason" field for "Leave" form only */}
//             {leaveType === "Leave" && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     select
//                     label="Reason"
//                     name="reason"
//                     value={formData.reason}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                   >
//                     {leaveReasons.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

//                 {/* Conditionally render the "Other Reason" field if "Other" is selected */}
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Other Reason"
//                     name="otherReason"
//                     value={formData.otherReason}
//                     onChange={handleChange}
//                     fullWidth
//                     required={formData.reason === "Other"}
//                     disabled={formData.reason !== "Other"}
//                   />
//                 </Grid>
//               </>
//             )}

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Start Date"
//                 name="startDate"
//                 type="date"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="End Date"
//                 name="endDate"
//                 type="date"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 required
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Leave balance display outside the form */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           p: 2,
//           ml: 2,
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           minWidth: "20%",
//           backgroundColor: "#f4f4f9",
//         }}
//       >
//         <Typography variant="h6">Current Leave Balance</Typography>
//         {formData.reason === "Casual Leave" && (
//           <Typography>Casual Leave: {leaveBalance.casualLeave}</Typography>
//         )}
//         {formData.reason === "Sick Leave" && (
//           <Typography>Sick Leave: {leaveBalance.sickLeave}</Typography>
//         )}
//         {formData.reason === "Festival Leave" && (
//           <Typography>Festival Leave: {leaveBalance.festivalLeave}</Typography>
//         )}
//         {leaveType === "OD" && <Typography>OD: {leaveBalance.od}</Typography>}
//         {leaveType === "Internship" && (
//           <Typography>Internship: {leaveBalance.internship}</Typography>
//         )}
//       </Box>
//     </Box>

//     <Button
//       variant="contained"
//       color="primary"
//       onClick={handleSubmit}
//       fullWidth
//       sx={{ mt: 3 }}
//     >
//       Submit
//     </Button>
//   </Box>
// </Container>


//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//     </Box>
//   );
// }

// export default LeaveApplicationForm;
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

// Simulate fetching user leave data from an API or database
const initialLeaveBalance = {
  casualLeave: 5,
  sickLeave: 3,
  festivalLeave: 2,
  od: 5,
  internship: Infinity,
};

const alreadyTakenLeave = {
  casualLeave: 2,
  sickLeave: 1,
  festivalLeave: 0,
  od: 1,
  internship: 2,
};

const leaveTypes = [
  { value: "Leave", label: "Leave" },
  { value: "OD", label: "OD" },
  { value: "Internship", label: "Internship" },
];

const leaveReasons = [
  { value: "Casual Leave", label: "Casual Leave" },
  { value: "Sick Leave", label: "Sick Leave" },
  { value: "Festival Leave", label: "Festival Leave" },
  { value: "Other", label: "Other" },
];

function LeaveApplicationForm() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    sinNumber: "",
    email: "",
    reason: "",
    otherReason: "",
    odReason: "",
    startDate: "",
    endDate: "",
    duration: "",
  });

  const [leaveType, setLeaveType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [leaveBalance, setLeaveBalance] = useState({
    casualLeave: initialLeaveBalance.casualLeave - alreadyTakenLeave.casualLeave,
    sickLeave: initialLeaveBalance.sickLeave - alreadyTakenLeave.sickLeave,
    festivalLeave: initialLeaveBalance.festivalLeave - alreadyTakenLeave.festivalLeave,
    od: initialLeaveBalance.od - alreadyTakenLeave.od,
    internship: initialLeaveBalance.internship,
  });
  const [isFormSubmittedToday, setIsFormSubmittedToday] = useState(false);

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInTime = end - start;
    return Math.ceil(diffInTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "leaveType") {
      setLeaveType(value);
    }

    if (name === "reason") {
      setFormData((prevData) => ({
        ...prevData,
        reason: value,
        otherReason: value === "Other" ? prevData.otherReason : "",
      }));
    }

    if (name === "startDate" || name === "endDate") {
      const duration = calculateDuration(
        name === "startDate" ? value : formData.startDate,
        name === "endDate" ? value : formData.endDate
      );
      setFormData((prevData) => ({
        ...prevData,
        duration: duration,
      }));
    }
  };

  const validateForm = () => {
    const duration = formData.duration;

    if (
      !formData.name ||
      !formData.sinNumber ||
      !formData.email ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setSnackbarMessage("Please fill all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    if (leaveType === "Leave" && !formData.reason) {
      setSnackbarMessage("Please select a reason.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    if (formData.reason === "Other" && !formData.otherReason) {
      setSnackbarMessage("Please provide the other reason.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    if (
      (formData.reason === "Casual Leave" ||
        formData.reason === "Sick Leave" ||
        formData.reason === "Festival Leave") &&
      !formData.otherReason
    ) {
      setSnackbarMessage("Please provide the reason for the leave.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbarMessage("Invalid email format.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    if (formData.reason === "Casual Leave" && duration > leaveBalance.casualLeave) {
      setSnackbarMessage("Insufficient Casual Leave balance.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    if (formData.reason === "Sick Leave" && duration > leaveBalance.sickLeave) {
      setSnackbarMessage("Insufficient Sick Leave balance.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    if (formData.reason === "Festival Leave" && duration > leaveBalance.festivalLeave) {
      setSnackbarMessage("Insufficient Festival Leave balance.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormSubmittedToday) {
      setSnackbarMessage("You have already submitted the form today.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    const duration = formData.duration;

    if (formData.reason === "Casual Leave") {
      setLeaveBalance((prev) => ({ ...prev, casualLeave: prev.casualLeave - duration }));
    } else if (formData.reason === "Sick Leave") {
      setLeaveBalance((prev) => ({ ...prev, sickLeave: prev.sickLeave - duration }));
    } else if (formData.reason === "Festival Leave") {
      setLeaveBalance((prev) => ({ ...prev, festivalLeave: prev.festivalLeave - duration }));
    }

    setSnackbarMessage(`${leaveType} form successfully submitted.`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setIsFormSubmittedToday(true);
  };

  return (
    <Box>
      <AppBar color="primary">
        <Toolbar className="head">
          <div className="icon" color="inherit">
            <IconButton color="inherit">
              <CancelIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth sx={{ mb: 2, mt: 3, p: 0 }}>
        <Box sx={{ mb: 3, mt: 2 }}>
          <FormControl fullWidth>
            <Typography variant="h6">Select Form Type</Typography>
            <TextField
              select
              name="leaveType"
              label="Form Type"
              value={leaveType}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {leaveTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

           {/* Conditionally render the leave/OD balance based on the selected leaveType */}
           <Box
            sx={{
              mb: 2,
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Render leave balance on the right side */}
            <Box sx={{ flex: 1, textAlign: "right" }}>
              {leaveType === "Leave" && formData.reason && (
                <Typography variant="body1">
                  Leave Balance for {formData.reason}:{" "}
                  {formData.reason === "Casual Leave" && leaveBalance.casualLeave}
                  {formData.reason === "Sick Leave" && leaveBalance.sickLeave}
                  {formData.reason === "Festival Leave" && leaveBalance.festivalLeave}
                </Typography>
              )}
              {leaveType === "OD" && (
                <Typography variant="body1">
                  OD Balance: {leaveBalance.od}
                </Typography>
              )}
              {leaveType === "Internship" && (
                <Typography variant="body1">
                  Internship Balance: {leaveBalance.internship}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ mb: 2, mt: 2 }}>
  <Grid container spacing={2}>
    {/* Left side - Form */}
    <Grid item xs={12} md={8}>
      <Card
        sx={{
          display: "inline-block",
          width: "100%",
          mb: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sin Number"
                name="sinNumber"
                value={formData.sinNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {leaveType === "Leave" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Leave Reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    fullWidth
                  >
                    {leaveReasons.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {(formData.reason === "Casual Leave" ||
                  formData.reason === "Sick Leave" ||
                  formData.reason === "Festival Leave" ||
                  formData.reason === "Other") && (
                  <Grid item xs={12}>
                    <TextField
                      label="Leave Reason"
                      name="otherReason"
                      value={formData.otherReason}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                )}
              </>
            )}

            {leaveType === "OD" && (
              <Grid item xs={12}>
                <TextField
                  label="OD Reason"
                  name="odReason"
                  value={formData.odReason}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            )}

            {leaveType === "Internship" && (
              <Grid item xs={12}>
                <TextField
                  label="Internship Reason"
                  name="internshipReason"
                  value={formData.internshipReason}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Total Duration (Days)"
                name="duration"
                value={formData.duration}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>

    {/* Right side - Leave Balance */}
    <Grid item xs={6} md={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "8px", // Increased border-radius for better aesthetics
          width: "200px", // Reduced width
          height: "200px", // Reduced height
          backgroundColor: "#f4f4f9",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a slight shadow for depth
          position: "relative", // Allows manual positioning
          left: "200px", // Adjust for manual horizontal positioning
          top: "60px", // Adjust for manual vertical positioning
        }}
        
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Current Leave Balance
        </Typography>
        {formData.reason === "Casual Leave" && (
          <Typography>Casual Leave: {leaveBalance.casualLeave}</Typography>
        )}
        {formData.reason === "Sick Leave" && (
          <Typography>Sick Leave: {leaveBalance.sickLeave}</Typography>
        )}
        {formData.reason === "Festival Leave" && (
          <Typography>Festival Leave: {leaveBalance.festivalLeave}</Typography>
        )}
        {leaveType === "OD" && (
          <Typography>OD: {leaveBalance.od}</Typography>
        )}
        {leaveType === "Internship" && (
          <Typography>Internship: {leaveBalance.internship}</Typography>
        )}
      </Box>
    </Grid>
  </Grid>

  {/* <Box
  sx={{
    display: "flex",
    justifyContent: "center", // Horizontally center the button
    alignItems: "center", // Vertically center the button (if needed for parent height)
    mt: 7,
  }}
>
  <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
    sx={{
      width: "200px", // Increased width
      height: "50px",  // Increased height
      padding: "10px 20px", // Adjusted padding
      fontSize: "16px", // Increased font size for a larger button feel
    }}
  >
    Submit
  </Button>
</Box> */}


  {/* Submit Button */}
  <Box>
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      fullWidth
      sx={{ mt: 7 }}
    >
      Submit
    </Button>
  </Box>
</Box>


          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
}

export default LeaveApplicationForm;
