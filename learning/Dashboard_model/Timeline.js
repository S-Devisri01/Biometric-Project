import React from 'react';
import './Timeline.css';

const Timeline = () => {
  const days = [
    { date: '2024-08-19', status: 'on-time' },
    { date: '2024-08-20', status: 'late' },
    { date: '2024-08-21', status: 'holiday' },
    { date: '2024-08-22', status: 'absent' },
    { date: '2024-08-23', status: 'sick-leave' },
    { date: '2024-08-24', status: 'vacation' },
    { date: '2024-08-25', status: 'permission' }
  ];

  const hours = Array.from({ length: 10 }, (_, i) => `${9 + i}:00`);

  return (
    <div className="timeline">
      {days.map((day, index) => (
        <div key={index} className={`day ${day.status}`}>
          <div className="date-box">{day.date}</div>
          <div className="hour-grid">
            {hours.map((hour, i) => (
              <div key={i} className="hour-box">
                {hour}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
