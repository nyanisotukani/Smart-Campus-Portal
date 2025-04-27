import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../student/student-dashboard/StudentDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className='dashboard-container'>
      
      {/* Sidebar */}
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
              <img src="https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png" alt="Manage Users" className='icon' />
              <a href="#manage-users">Manage Users</a>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/announcement.png" alt="Manage Announcements" className='icon' />
              <a href="#manage-announcements">Manage Announcements</a>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/reservation-2.png" alt="Manage Bookings" className='icon' />
              <a href="#manage-bookings">Manage Bookings</a>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/maintenance.png" alt="Maintenance" className='icon' />
              <a href="#maintenance">Maintenance</a>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/calendar.png" alt="Timetables" className='icon' />
              <a href="#timetables">Timetables</a>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/combo-chart.png" alt="Analytics" className='icon' />
              <a href="#analytics">Analytics</a>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/settings.png" alt="Settings" className='icon' />
              <a href="#settings">Settings</a>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-filled/50/000000/logout-rounded.png" alt="Logout" className='icon' />
              <a href="#logout">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='main-content'>
        
        {/* Header */}
        <div className='heading'>
          <h1>Smart Campus Services Portal</h1>
          <div className='student-info'>
            <h2>{state?.name || "Admin"}</h2>
            <p>Administrator</p>
          </div>
        </div>

        {/* Welcome Section */}
        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{currentDate}</h4>
            <h1>Welcome back, {state?.name || "Admin"}!</h1>
            <p>Manage your campus services efficiently and easily.</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        {/* Dashboard Widgets */}
        <section className='dashboard-widgets'>
          {/* Example Widgets (you can add cards/statistics here later) */}
          {/* Example: Total Students, Total Bookings, Pending Maintenance Requests */}
        </section>

      </main>

    </div>
  );
};

export default AdminDashboard;
