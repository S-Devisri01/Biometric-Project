// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LeaveApplicationForm from "../LeaveApplication";
// import Dashboard from "../screens/Dashboard"; // Import your Dashboard component here
// import Organization from "../screens/Organization"; // Import Organization component here
// import Employees from "../screens/Employees"; // Import Employees component here
// import Workflow from "../screens/Workflow"; // Import Workflow component here

// const MainNavigator = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/leave-application" element={<LeaveApplicationForm />} />
//         <Route path="/organization" element={<Organization />} />
//         <Route path="/employees" element={<Employees />} />
//         <Route path="/workflow" element={<Workflow />} />
//       </Routes>
//     </Router>
//   );
// };

// export default MainNavigator;


// src/navigation/MainNavigator.js


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../components/LoginPage";
import Dashboard from "../Screens/Dashboard";
import DailyAttendance from "../components/DailyAttendance";
import WeeklyAttendance from "../components/WeeklyAttendance";
import MonthlyAttendance from "../components/MonthlyAttendance";
import SearchPage from "../components/SearchPage";
import LeaveApprovalStatus from "../components/LeaveApprovalStatus";


import Staffdash from "../Screens/staffdash";
import AttendanceView from "../components/AttendanceView";
import StudentAttendance from "../components/StudentAttendance";
import PersonalAttendance from "../components/PersonalAttendance";
import RequestTable from "../components/RequestTable";
import DataPage from "../components/DataPage";
import StaffLeaveApplication from "../components/StaffLeaveApplication";
import StaffLeaveApprovalStatus from "../components/StaffLeaveApprovalStatus";
// MainNavigator with Authentication Logic
export const MainNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  // Callback function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true); // Update authentication status
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* If not authenticated, show the Login page */}
            {!isAuthenticated ? (
              <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            ) : (
              <>
                {/* If authenticated, show the dashboard and other routes */}
                
                <Route path="/logout" element={<LoginPage onLogin={handleLogin}/>}/>

                <Route path="/staff-dashboard" element={<Staffdash/>}/>
                <Route path="/attendance-view" element={<AttendanceView />} />
        <Route path="/attendance/student" element={<StudentAttendance />} />
        <Route path="/attendance/personal" element={<PersonalAttendance />} />
        <Route path="/request-table" element={<RequestTable />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/Staff-Leave-Request" element={<StaffLeaveApplication/>} />
        <Route path="/Staff-LeaveApproval-Status" element={<StaffLeaveApprovalStatus/>} />



                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/DailyAttendance/:sin" element={<DailyAttendance />} />
                <Route path="/WeeklyAttendance/:sin" element={<WeeklyAttendance />} />
                <Route path="/MonthlyAttendance/:sin" element={<MonthlyAttendance />} />
                <Route path="/attendanceview" element={<SearchPage />} />
                <Route path="/LeaveApprovalStatus" element={<LeaveApprovalStatus />} />
                {/* Redirect / to /dashboard once authenticated */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                {/* <Route path="/logout" element={<Navigate to ="/Login"/>}/>  */}
              </>
            )}

            {/* Catch all unmatched routes and redirect based on authentication status */}
            <Route
              path="*"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default MainNavigator;
