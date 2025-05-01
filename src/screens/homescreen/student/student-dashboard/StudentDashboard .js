import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      alert('Session expired. Please login again.');
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

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
              <button onClick={() => navigate("/student")} className="sidebar-btn">Dashboard</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=34990&format=png&color=000000" alt="Timetable" className='icon' />
              <button onClick={() => navigate('/student-timetable')} className="sidebar-btn">Timetable</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=8080&format=png&color=000000" alt="Room Booking" className='icon' />
              <button onClick={() =>  navigate('/room-booking')} className="sidebar-btn">Room Booking</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=116946&format=png&color=000000" alt="Report Maintenance" className='icon' />
              <button onClick={() =>  navigate('/report-maintanance')} className="sidebar-btn">Maintenance</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notifications" className='icon' />
              <button onClick={() =>  navigate('/notifications')} className="sidebar-btn">Notifications</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=ShVC6pYnGs5L&format=png&color=000000" alt="Profile" className='icon' />
              <button onClick={() =>  navigate('/profile')} className="sidebar-btn">Profile</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" alt="Logout" className='icon' />
              <button onClick={handleLogout} className="sidebar-btn">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className='main-content'>
        <div className='heading'>
          <h1>Smart Campus Services Portal</h1>
          <div className='student-info'>
            <h2>{user ? `${user.firstName} ${user.lastName}` : "Student"}</h2>
            <p>{user?.role || "Student"}</p>
          </div>
        </div>

        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{currentDate}</h4>
            <h1>Welcome back, {user ? user.firstName : "Student"}!</h1>
            <p>Always stay updated in your student portal.</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image'/>
        </section>

        <section className='dashboard-widgets'>
          <div className='widget'>
            <h3>📅 Timetable</h3>
            <p>View your class schedule for the week.</p>
            <button onClick={() => navigate('/student-timetable')}>View Timetable</button>
          </div>

          <div className='widget'>
            <h3>🏠 Room Booking</h3>
            <p>Book study rooms and appointments easily.</p>
            <button onClick={() => navigate('/room-booking')}>Book Now</button>
          </div>

          <div className='widget'>
            <h3>🛠️ Report Maintenance</h3>
            <p>Raise any issues with campus facilities.</p>
            <button onClick={() => navigate('/report-maintanance')}>Report Issue</button>
          </div>

          <div className='widget'>
            <h3>🔔 Notifications</h3>
            <p>Stay updated with the latest campus news.</p>
            <ul>
              <li>No new notifications.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
