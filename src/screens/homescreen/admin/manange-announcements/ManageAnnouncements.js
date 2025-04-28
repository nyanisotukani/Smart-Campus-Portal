import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageAnnouncements.css'; // Assuming you have a CSS file for styling


const ManageAnnouncements = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Hardcoded announcements data
  // Hardcoded announcements data with lecturer information
  const announcements = [
    { id: 1, title: 'Mid-Term Break Notice', description: 'Campus will be closed from Oct 15 to Oct 22.', date: 'October 10, 2025', lecturerName: 'Dr. Jane Smith', lecturerEmail: 'janesmith@university.edu' },
    { id: 2, title: 'Maintenance Downtime', description: 'Library system maintenance on Oct 12.', date: 'October 8, 2025', lecturerName: 'Prof. John Doe', lecturerEmail: 'johndoe@university.edu' },
    { id: 3, title: 'New Cafeteria Opening', description: 'Join us for the grand opening of the new cafeteria!', date: 'October 5, 2025', lecturerName: 'Dr. Alice Brown', lecturerEmail: 'alicebrown@university.edu' },
  ];

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
                <button onClick={() => navigate("/admin")} className="sidebar-btn">Dashboard</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png" alt="Manage Users" className='icon' />
                <button onClick={() => navigate("/manage-users")} className="sidebar-btn">Manage Users</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/announcement.png" alt="Manage Announcements" className='icon' />
                <button onClick={() => navigate("/manage-announcements")} className="sidebar-btn">Manage Announcements</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/reservation-2.png" alt="Manage Bookings" className='icon' />
                <button onClick={() => navigate("/manage-bookings")} className="sidebar-btn">Manage Bookings</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/maintenance.png" alt="Maintenance" className='icon' />
                <button onClick={() => navigate("/maintenance")} className="sidebar-btn">Maintenance</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/calendar.png" alt="Timetables" className='icon' />
                <button onClick={() => navigate("/timetables")} className="sidebar-btn">Timetables</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/combo-chart.png" alt="Analytics" className='icon' />
                <button onClick={() => navigate("/analytics")} className="sidebar-btn">Analytics</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/settings.png" alt="Settings" className='icon' />
                <button onClick={() => navigate("/settings")} className="sidebar-btn">Settings</button>
                </li>
                <li>
                <img src="https://img.icons8.com/ios-filled/50/000000/logout-rounded.png" alt="Logout" className='icon' />
                <button onClick={() => navigate("/logout")} className="sidebar-btn">Logout</button>
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
            <h1>Manage Announcements</h1>
            <p>Create, view, and update important campus announcements with ease.</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        {/* Dashboard Widgets */}
        <section className='dashboard-widgets'>
          {/* Example Widgets (you can add cards/statistics here later) */}
          <div className='announcements-header'>
            <h2>All Announcements</h2>
            <button className='add-announcement-button'>+ New Announcement</button>
          </div>

          <div className='announcements-list'>
            {announcements.map((announcement) => (
              <div key={announcement.id} className='announcement-card'>
                <h3>{announcement.title}</h3>
                <p>{announcement.description}</p>
                <span className='announcement-date'>{announcement.date}</span>
                <div className='lecturer-info'>
                  <p><strong>From:</strong> {announcement.lecturerName} ({announcement.lecturerEmail})</p>
                </div>
                <div className='announcement-actions'>
                  <button className='edit-button'>Edit</button>
                  <button className='delete-button'>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {/* Example: Total Students, Total Bookings, Pending Maintenance Requests */}
        </section>

      </main>

    </div>
  );
};

export default ManageAnnouncements;
