import React, { useState } from 'react';
import Header from './Header';
import AttendanceCalendar from './AttendanceCalendar';
import LeaveTracker from './LeaveTracker';
import './Dashboard.css';

function Dashboard() {
  // State to control the visibility of the navbar
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="dashboard">
      <Header setShowNav={setShowNav} /> {/* Pass state setter to Header if needed */}

      {showNav && (
        <nav className="navbar">
          <ul>
            <li><span>Apply Leave</span></li>
            <li><span>Apply OD</span></li>
            <li><span>Apply Out Pass</span></li>
          </ul>
        </nav>
      )}

      <div className="header-buttons">
        <button className="btn">Apply Leave</button>
        <button className="btn">Apply OD</button>
        <button className="btn">Apply Out Pass</button>
      </div>

      <main>
        <AttendanceCalendar />
        <LeaveTracker />
      </main>
    </div>
  );
}

export default Dashboard;
