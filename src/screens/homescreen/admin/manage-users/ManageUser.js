import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageUser.css';

const ManageUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

   
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role.toLowerCase() === filter;
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
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
            {/* Sidebar Links */}
            {/* Replace buttons with your own navigation logic as needed */}
            <li><img src="../images/dashboard.png" alt="Dashboard" className='icon' /><button onClick={() => navigate("/admin")} className="sidebar-btn">Dashboard</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png" alt="Manage Users" className='icon' /><button onClick={() => navigate("/manage-users")} className="sidebar-btn">Manage Users</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/announcement.png" alt="Manage Announcements" className='icon' /><button onClick={() => navigate("/manage-announcements")} className="sidebar-btn">Manage Announcements</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/reservation-2.png" alt="Manage Bookings" className='icon' /><button onClick={() => navigate("/manage-bookings")} className="sidebar-btn">Manage Bookings</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/maintenance.png" alt="Maintenance" className='icon' /><button onClick={() => navigate("/maintenance")} className="sidebar-btn">Maintenance</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/calendar.png" alt="Timetables" className='icon' /><button onClick={() => navigate("/timetables")} className="sidebar-btn">Timetables</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/combo-chart.png" alt="Analytics" className='icon' /><button onClick={() => navigate("/analytics")} className="sidebar-btn">Analytics</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/settings.png" alt="Settings" className='icon' /><button onClick={() => navigate("/settings")} className="sidebar-btn">Settings</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/logout-rounded.png" alt="Logout" className='icon' /><button onClick={() => navigate("/logout")} className="sidebar-btn">Logout</button></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='main-content'>
        <div className='heading'>
          <h1>Smart Campus Services Portal</h1>
          <div className='student-info'>
            <h2>{state?.name || "Admin"}</h2>
            <p>Administrator</p>
          </div>
        </div>

        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{currentDate}</h4>
            <h1>Manage Users</h1>
            <p>View, edit, and manage all campus user accounts from one place.</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        {/* Dashboard Widgets */}
        <section className='dashboard-widgets'>
          <section className='user-management-tools'>
            <div className='tools-row'>
              <div className='search-box'>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>

              <div className='filter-buttons'>
                {['all', 'student', 'lecturer', 'admin'].map((role) => (
                  <button
                    key={role}
                    className={filter === role ? 'active' : ''}
                    onClick={() => setFilter(role)}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}s
                  </button>
                ))}
              </div>

              <button className='add-user-btn'>
                <i className="fas fa-plus"></i> Add New User
              </button>
            </div>
          </section>

          {/* Users Table */}
          <section className='users-table-section'>
            {loading ? (
              <div className="loading">Loading users...</div>
            ) : error ? (
              <div className="error">Error: {error}</div>
            ) : (
              <div className='table-responsive'>
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className='user-info'>
                              <div className='user-avatar'>
                                {user.firstName.charAt(0)}
                              </div>
                              <div>
                                <div className='user-name'>{user.firstName} {user.lastName}</div>
                                <div className='user-email-mobile'>{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className='user-email'>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role.toLowerCase()}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${user.status.toLowerCase()}`}>
                              {user.status}
                            </span>
                          </td>
                          <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</td>
                          <td>
                            <div className='action-buttons'>
                              <button className="edit-btn" title="Edit User">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="delete-btn" title="Delete User">
                                <i className="fas fa-trash-alt"></i>
                              </button>
                              <button className="more-btn" title="More Options">
                                <i className="fas fa-ellipsis-v"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className='no-results'>
                          <i className="fas fa-user-slash"></i>
                          <span>No users found matching your criteria</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className='table-footer'>
              <div className='table-summary'>
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className='pagination-controls'>
                <button disabled><i className="fas fa-chevron-left"></i></button>
                <span>1</span>
                <button disabled><i className="fas fa-chevron-right"></i></button>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default ManageUser;
