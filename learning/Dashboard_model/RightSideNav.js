import React, { useState } from 'react';
import './RightSideNav.css';

const RightSideNav = () => {
  const [activeTab, setActiveTab] = useState(null); // null, 'profile', 'notifications'

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <>
      <div className="icon-container">
        <button className="nav-toggle-btn" onClick={() => toggleTab('notifications')}>
          <img src="notification-icon.png" alt="Notifications" className="icon" />
        </button>
        <button className="nav-toggle-btn" onClick={() => toggleTab('profile')}>
          <img src="user-icon.png" alt="User Profile" className="icon" />
        </button>
      </div>

      {activeTab && (
        <div className="side-nav">
          {activeTab === 'profile' && (
            <div className="profile-details">
              <img src="user-image-placeholder.png" alt="User" className="profile-img" />
              <p className="profile-name">John Doe</p>
              <p className="profile-email">john.doe@example.com</p>
              <button className="btn">Logout</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications">
              <h3>Notifications</h3>
              <ul>
                <li>Notification 1</li>
                <li>Notification 2</li>
                <li>Notification 3</li>
                {/* Add more notifications as needed */}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RightSideNav;
