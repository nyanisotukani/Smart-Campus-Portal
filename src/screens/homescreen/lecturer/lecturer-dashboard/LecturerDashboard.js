import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LecturerDashboard.css'; // Assuming you have a CSS file for styling
const LecturerDashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  

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
        <button onClick={() => navigate("/lecturer")} className="sidebar-btn">Dashboard</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=34990&format=png&color=000000" alt="Timetable" className='icon' />
        <button onClick={() => navigate('/lecturer-timetable')} className="sidebar-btn">Timetable</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=8080&format=png&color=000000" alt="Room Booking" className='icon' />
        <button onClick={() =>  navigate('/lecturer-room-booking')} className="sidebar-btn">Room Booking</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=116946&format=png&color=000000" alt="Report Maintenance" className='icon' />
        <button onClick={() =>  navigate('/lecturer-report-maintanance')} className="sidebar-btn">Report Maintanance</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notifications" className='icon' />
        <button onClick={() =>  navigate('/post-announcements')} className="sidebar-btn">Post Announcements</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=ShVC6pYnGs5L&format=png&color=000000" alt="Profile" className='icon' />
        <button onClick={() =>  navigate('/profile')} className="sidebar-btn">Profile</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" alt="Logout" className='icon' />
        <button onClick={() =>  navigate('/notifications')} className="sidebar-btn">Logout</button>
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
            <h1>Welcome back, {state?.name || "Lecturer"}!</h1>
            <p>Always stay updated in your teaching portal.</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image'/>
        </section>

        <section className='dashboard-widgets'>
          {/* Future dashboard content goes here */}
          <section className='dashboard-widgets'>
            <div className='widget'>
                <h3>📅 Timetable</h3>
                <p>View your class schedule for the week.</p>
                <button  onClick={() => navigate('/lecturer-timetable')}>View Timetable</button>
            </div>

            <div className='widget'>
                <h3>🏠 Room Booking</h3>
                <p>Book study rooms and appointments easily.</p>
                <button onClick={() => navigate('/lecturer-room-booking')}>Book Now</button>
            </div>

            <div className='widget'>
                <h3>🛠️ Report Maintenance</h3>
                <p>Raise any issues with campus facilities.</p>
                <button onClick={() => navigate('/lecturer-report-maintanance')}>Report Issue</button>
            </div>
            <div className='widget'>
                <h3>🛠️ Post Announcements</h3>
                <p>Share important updates with your students.</p>
                <button onClick={() => navigate('/post-announcements')}>Post Announcements</button>
            </div>
 
            <div className='widget'>
                <h3>🔔 Notifications</h3>
                <p>Stay updated with the latest campus news.</p>
                <ul>
                <li>No new notifications.</li>
                </ul>
            </div>
            
            </section>

        </section>
      </main>
    </div>
  );
};

export default LecturerDashboard;
