import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../student/student-dashboard/StudentDashboard.css";
import './Analytics.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Hardcoded analytics data
  const analyticsData = {
    userStats: {
      totalUsers: 1243,
      students: 1024,
      lecturers: 198,
      admins: 21,
      activeToday: 843
    },
    bookingStats: {
      totalBookings: 356,
      pending: 42,
      approved: 289,
      rejected: 25,
      popularRoom: "Library Study Room A"
    },
    maintenanceStats: {
      totalRequests: 178,
      pending: 23,
      resolved: 142,
      inProgress: 13,
      avgResolutionTime: "2.3 days"
    },
    announcementStats: {
      totalAnnouncements: 67,
      active: 12,
      expired: 55,
      mostViewed: "Exam Schedule Update"
    },
    weeklyTrends: {
      bookings: [45, 52, 60, 48, 72, 65, 80],
      maintenance: [12, 15, 8, 10, 18, 20, 15],
      logins: [320, 350, 380, 400, 420, 390, 450]
    }
  };

  return (
    <div className='dashboard-container'>
      {/* Sidebar remains the same */}
      <aside className='sidebar'>
        <div className='sidebar-header'>
          <img src="smart-campus-app\publicimages/welcome.png" alt="Logo" className='logo' />
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
            <li className='active'>
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
            <h1>Analytics Dashboard</h1>
            <p>Comprehensive overview of campus services usage and performance.</p>
          </div>
          <img src="../images/welcome.png" alt="Analytics" className='welcome-image' />
        </section>

        {/* Analytics Dashboard */}
        <section className='analytics-dashboard'>
          {/* Summary Cards */}
          <div className='summary-cards'>
            <div className='summary-card'>
              <div className='card-icon users-icon'></div>
              <h3>Total Users</h3>
              <p className='big-number'>{analyticsData.userStats.totalUsers}</p>
              <div className='card-breakdown'>
                <span>Students: {analyticsData.userStats.students}</span>
                <span>Lecturers: {analyticsData.userStats.lecturers}</span>
                <span>Admins: {analyticsData.userStats.admins}</span>
              </div>
            </div>
            
            <div className='summary-card'>
              <div className='card-icon bookings-icon'></div>
              <h3>Room Bookings</h3>
              <p className='big-number'>{analyticsData.bookingStats.totalBookings}</p>
              <div className='card-breakdown'>
                <span>Approved: {analyticsData.bookingStats.approved}</span>
                <span>Pending: {analyticsData.bookingStats.pending}</span>
                <span>Popular: {analyticsData.bookingStats.popularRoom}</span>
              </div>
            </div>
            
            <div className='summary-card'>
              <div className='card-icon maintenance-icon'></div>
              <h3>Maintenance</h3>
              <p className='big-number'>{analyticsData.maintenanceStats.totalRequests}</p>
              <div className='card-breakdown'>
                <span>Resolved: {analyticsData.maintenanceStats.resolved}</span>
                <span>Pending: {analyticsData.maintenanceStats.pending}</span>
                <span>Avg. Time: {analyticsData.maintenanceStats.avgResolutionTime}</span>
              </div>
            </div>
            
            <div className='summary-card'>
              <div className='card-icon announcements-icon'></div>
              <h3>Announcements</h3>
              <p className='big-number'>{analyticsData.announcementStats.totalAnnouncements}</p>
              <div className='card-breakdown'>
                <span>Active: {analyticsData.announcementStats.active}</span>
                <span>Expired: {analyticsData.announcementStats.expired}</span>
                <span>Top: {analyticsData.announcementStats.mostViewed}</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className='charts-section'>
            <div className='chart-container'>
              <h3>Weekly Bookings Trend</h3>
              <div className='bar-chart'>
                {analyticsData.weeklyTrends.bookings.map((value, index) => (
                  <div key={index} className='bar' style={{ height: `${value}px` }}>
                    <span className='bar-value'>{value}</span>
                    <span className='bar-label'>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className='chart-container'>
              <h3>Maintenance Requests</h3>
              <div className='line-chart'>
                {analyticsData.weeklyTrends.maintenance.map((value, index) => (
                  <div key={index} className='line-point' style={{ bottom: `${value * 10}px` }}>
                    <span className='point-value'>{value}</span>
                    <div className='point-connector'></div>
                  </div>
                ))}
                <div className='line'></div>
              </div>
              <div className='line-chart-labels'>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <span key={index}>{day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className='metrics-grid'>
            <div className='metric-card'>
              <h3>Active Users Today</h3>
              <p className='metric-value'>{analyticsData.userStats.activeToday}</p>
              <div className='metric-progress'>
                <div className='progress-bar' style={{ width: `${(analyticsData.userStats.activeToday / analyticsData.userStats.totalUsers) * 100}%` }}></div>
              </div>
              <p className='metric-description'>{Math.round((analyticsData.userStats.activeToday / analyticsData.userStats.totalUsers) * 100)}% of total users</p>
            </div>
            
            <div className='metric-card'>
              <h3>Booking Approval Rate</h3>
              <p className='metric-value'>{Math.round((analyticsData.bookingStats.approved / analyticsData.bookingStats.totalBookings) * 100)}%</p>
              <div className='metric-progress'>
                <div className='progress-bar' style={{ width: `${(analyticsData.bookingStats.approved / analyticsData.bookingStats.totalBookings) * 100}%` }}></div>
              </div>
              <p className='metric-description'>{analyticsData.bookingStats.approved} approved out of {analyticsData.bookingStats.totalBookings}</p>
            </div>
            
            <div className='metric-card'>
              <h3>Maintenance Resolution</h3>
              <p className='metric-value'>{Math.round((analyticsData.maintenanceStats.resolved / analyticsData.maintenanceStats.totalRequests) * 100)}%</p>
              <div className='metric-progress'>
                <div className='progress-bar' style={{ width: `${(analyticsData.maintenanceStats.resolved / analyticsData.maintenanceStats.totalRequests) * 100}%` }}></div>
              </div>
              <p className='metric-description'>{analyticsData.maintenanceStats.resolved} resolved out of {analyticsData.maintenanceStats.totalRequests}</p>
            </div>
            
            <div className='metric-card'>
              <h3>System Uptime</h3>
              <p className='metric-value'>99.8%</p>
              <div className='metric-progress'>
                <div className='progress-bar' style={{ width: '99.8%' }}></div>
              </div>
              <p className='metric-description'>Last incident: 3 days ago</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;