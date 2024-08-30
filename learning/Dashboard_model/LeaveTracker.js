import React from 'react';
import './LeaveTracker.css';

function LeaveTracker() {
  const leaveCategories = [
    { name: 'Sick Leave', count: 5 },
    { name: 'Vacation Leave', count: 2 },
    { name: 'Personal Leave', count: 1 },
    { name: 'Holidays', count: 3 },
  
  ];

  return (
    <div className="leave-tracker">
      <h2>Leave Tracker</h2>
      <div className="category-grid">
        {leaveCategories.map((category) => (
          <div key={category.name} className="category-card">
            <div className="circle"></div>
            <h3>{category.name}</h3>
            <p className="leave-count">{category.count} Applied</p>
      
            <p>Leave balance: 1</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaveTracker;




