import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageUser.css';
import { AddUserDialog, EditUserDialog, DeleteUserDialog, StatusUpdateDialog } from './UserDialogs';

const ManageUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize] = useState(10);

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  // Function to fetch users with debouncing for search and filter
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Build query params
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', pageSize);
      if (filter !== 'all') params.append('role', filter);
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(`https://smart-campus-backend-gz8b.onrender.com/api/admin/users?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data.users || []);
      setTotalUsers(data.pagination?.total || 0);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filter, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when search changes
      fetchUsers();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, filter]);

  // Handle adding a new user
  const handleAddUser = async (userData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://smart-campus-backend-gz8b.onrender.com/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add user');
      }

      // Close dialog and refresh user list
      setIsAddDialogOpen(false);
      fetchUsers();
      showToast('User added successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a user
  const handleEditUser = async (userData) => {
    if (!selectedUser?._id) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://smart-campus-backend-gz8b.onrender.com/api/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      // Close dialog and refresh user list
      setIsEditDialogOpen(false);
      fetchUsers();
      showToast('User updated successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async () => {
    if (!selectedUser?._id) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://smart-campus-backend-gz8b.onrender.com/api/admin/users/${selectedUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      // Close dialog and refresh user list
      setIsDeleteDialogOpen(false);
      fetchUsers();
      showToast('User deleted successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle updating user status
  const handleUpdateStatus = async (newStatus) => {
    if (!selectedUser?._id) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://smart-campus-backend-gz8b.onrender.com/api/admin/users/${selectedUser._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user status');
      }

      // Close dialog and refresh user list
      setIsStatusDialogOpen(false);
      fetchUsers();
      showToast('User status updated successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to show toast messages
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Pagination control functions
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
            <li><img src="../images/dashboard.png" alt="Dashboard" className='icon' /><button onClick={() => navigate("/admin")} className="sidebar-btn">Dashboard</button></li>
            <li><img src="https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png" alt="Manage Users" className='icon' /><button onClick={() => navigate("/manage-users")} className="sidebar-btn active">Manage Users</button></li>
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

        {/* Toast Notification */}
        {toast.show && (
          <div className={`toast-notification ${toast.type}`}>
            <p>{toast.message}</p>
            <button onClick={() => setToast({ ...toast, show: false })}>×</button>
          </div>
        )}

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

              <button className='add-user-btn' onClick={() => setIsAddDialogOpen(true)}>
                <i className="fas fa-plus"></i> Add New User
              </button>
            </div>
          </section>

          {/* Users Table */}
          <section className='users-table-section'>
            {loading && users.length === 0 ? (
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
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{(currentPage - 1) * pageSize + index + 1}</td>
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
                            <span 
                              className={`status-badge ${user.status.toLowerCase()}`}
                              onClick={() => {
                                setSelectedUser(user);
                                setIsStatusDialogOpen(true);
                              }}
                              title="Click to change status"
                            >
                              {user.status}
                            </span>
                          </td>
                          <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</td>
                          <td>
                            <div className='action-buttons'>
                              <button 
                                className="edit-btn" 
                                title="Edit User"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="delete-btn" 
                                title="Delete User"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
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
                Showing {users.length} of {totalUsers} users
              </div>
              <div className='pagination-controls'>
                <button 
                  disabled={currentPage === 1 || loading} 
                  onClick={handlePreviousPage}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages || loading} 
                  onClick={handleNextPage}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* User Dialogs */}
      <AddUserDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddUser}
      />
      
      <EditUserDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditUser}
        user={selectedUser}
      />
      
      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        userName={selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''}
      />
      
      <StatusUpdateDialog
        isOpen={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        onUpdate={handleUpdateStatus}
        user={selectedUser}
      />
    </div>
  );
};

export default ManageUser;