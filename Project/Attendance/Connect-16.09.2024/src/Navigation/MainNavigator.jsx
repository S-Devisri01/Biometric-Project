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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "../Screens/Dashboard";
import DailyAttendance from "../components/DailyAttendance";
import WeeklyAttendance from "../components/WeeklyAttendance";
import MonthlyAttendance from "../components/MonthlyAttendance";

export const MainNavigator = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/daily/:sin" element={<DailyAttendance />} />
            <Route path="/weekly/:sin" element={<WeeklyAttendance />} />
            <Route path="/monthly/:sin" element={<MonthlyAttendance />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};
