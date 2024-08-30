import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';

function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStudent, setSelectedStudent] = useState('John Doe');

  const attendanceData = {
    '2024-08-13': { status: 'holiday', label: 'Holiday' },
    '2024-08-14': { status: 'late', label: 'Late (Traffic)', time: '9am-5pm' },
    '2024-08-15': { status: 'on-time', label: 'On time', time: '10am-6pm' },
    '2024-08-16': { status: 'on-time', label: 'On time', time: '9am-5pm', details: { checkIn: '9:00 AM', checkOut: '5:00 PM', total: '8hr' } },
    '2024-08-17': { status: 'absent', label: 'Absent', reason: 'Family emergency' },
    '2024-08-18': { status: 'on-time', label: 'On time', time: '10am-6pm' },
    '2024-08-19': { status: 'on-time', label: 'On time', time: '9am-5pm' },
  };

  const renderTimeline = (dayData) => {
    if (!dayData.details) return null;
    const startTime = new Date(`2024-01-01 ${dayData.details.checkIn}`);
    const endTime = new Date(`2024-01-01 ${dayData.details.checkOut}`);
    const duration = (endTime - startTime) / (1000 * 60 * 60); // in hours
    const timelineWidth = `${(duration / 24) * 100}%`;
    const timelineStart = `${(startTime.getHours() / 24) * 100}%`;

    return (
      <div className="timeline-container">
        <div className="timeline" style={{ width: timelineWidth, marginLeft: timelineStart }}></div>
      </div>
    );
  };

  const renderWeek = () => {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    const days = [];

    for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
      const dateString = format(day, 'yyyy-MM-dd');
      const dayData = attendanceData[dateString] || {};

      days.push(
        <div key={dateString} className={`day ${dayData.status || ''}`}>
          <div className="date">{format(day, 'd')}</div>
          <div className="day-name">{format(day, 'EEEE')}</div>
          {dayData.label && <div className="status">{dayData.label}</div>}
          {dayData.time && <div className="time">{dayData.time}</div>}
          {dayData.reason && <div className="reason">{dayData.reason}</div>}
          {dayData.details && (
            <div className="details">
              <div>Check In: {dayData.details.checkIn}</div>
              <div>Check Out: {dayData.details.checkOut}</div>
              <div>Total: {dayData.details.total}</div>
            </div>
          )}
          {renderTimeline(dayData)}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="attendance-calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(addDays(currentDate, -7))}>←</button>
        <span>{`${format(startOfWeek(currentDate), 'MMM d, yyyy')} - ${format(endOfWeek(currentDate), 'MMM d, yyyy')}`}</span>
        <button onClick={() => setCurrentDate(addDays(currentDate, 7))}>→</button>
      </div>
      <div className="student-selector">
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
        </select>
      </div>
      <div className="calendar-grid">{renderWeek()}</div>
    </div>
    
  );
}

export default AttendanceCalendar;
