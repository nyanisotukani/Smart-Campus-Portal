import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../student/student-dashboard/StudentDashboard.css'
import '../../student/timetable/TimetableWidget.css'; // Assuming you have a CSS file for styling
const LecturerTimetable = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  const timetableData = [
    { day: 'Monday', classes: [
      { time: '08:00 - 10:00', subject: 'Software Engineering' },
      { time: '10:30 - 12:00', subject: 'Software Engineering' },
      
    ]},
    { day: 'Tuesday', classes: [
      { time: '09:00 - 11:00', subject: 'Software Engineering' },
      { time: '13:00 - 14:30', subject: 'Software Engineering' }
    ]},
    { day: 'Wednesday', classes: [] }, // No classes
    { day: 'Thursday', classes: [
      { time: '09:00 - 10:30', subject: 'Software Engineering' },
      
    ]},
    { day: 'Friday', classes: [
      { time: '08:00 - 09:30', subject: 'Software Engineering' },
      { time: '10:00 - 11:30', subject: 'Software Engineering' }
    ]},
  ];
  

  return (
    <div className='dashboard-container'>

<aside className='sidebar'>
  <div className='sidebar-header'>
    <img src="https://via.placeholder.com/150" alt="Logo" className='logo' />
  </div>
  <nav className='sidebar-nav'>
    <ul>
      <li>
        <img src="../images/dashboard.png" alt="Dashboard" className='icon' />
        <a href="#dashboard">Dashboard</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=34990&format=png&color=000000" alt="Timetable" className='icon' />
        <a href="#timetable">Timetable</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=8080&format=png&color=000000" alt="Room Booking" className='icon' />
        <a href="#booking">Room Booking</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=qvUK2KCJbwJa&format=png&color=000000" alt="Post Announcements" className='icon' />
        <a href="#booking">Post Announcements</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=116946&format=png&color=000000" alt="Report Maintenance" className='icon' />
        <a href="#maintenance">Report Maintenance</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notifications" className='icon' />
        <a href="#notifications">Notifications</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=ShVC6pYnGs5L&format=png&color=000000" alt="Profile" className='icon' />
        <a href="#profile">Profile</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" alt="Logout" className='icon' />
        <a href="#logout">Logout</a>
      </li>
    </ul>
  </nav>
</aside>

      <main className='main-content'>

        <div className='heading'>
            <h1> Smart Campus Services Portal</h1>
            <div className='student-info'>
                <h2>{state?.name || "Lecturer"}</h2>
                <p>Lecturer</p>
            </div>
        </div>
        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{currentDate}</h4>
            <h1>Weekly Class Timetable</h1>
            <p>Stay organized and keep track of your weekly schedule.</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image'/>
        </section>

        <section className='dashboard-widgets'>
        {/* Future dashboard content goes here */}
        <div className="timetable-grid">
          {timetableData.map((day, index) => (
            <div key={index} className="day-row">
              <div className="day-label">{day.day}</div>
              <div className="classes-row">
                {day.classes.length === 0 ? (
                  <div className="no-classes">No Classes 🎉</div>
                ) : (
                  day.classes.map((cls, idx) => (
                    <div key={idx} className="class-item">
                      <div className="class-time">{cls.time}</div>
                      <div className="class-subject">{cls.subject}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>


        </section>
      </main>
    </div>
  );
};

export default LecturerTimetable;
