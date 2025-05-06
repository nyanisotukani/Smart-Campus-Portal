import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageMaintanance.css';

const ManageMaintanance = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // State variables
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch maintenance requests from API
  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/maintenance');
      // Transform the data to match our component's expected format
      const formattedData = response.data.map(item => ({
        id: item._id,
        title: item.description.split('.')[0], // Use first sentence as title
        description: item.description,
        location: item.location,
        reportedBy: `${item.name} (${item.email})`,
        dateReported: new Date(item.submittedAt).toISOString().split('T')[0],
        status: item.status || "Pending", // Default to pending if not specified
        priority: item.priority || "Medium" // Default to medium if not specified
      }));
      setMaintenanceRequests(formattedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching maintenance requests:", err);
      setError("Failed to load maintenance requests. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update maintenance request status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/maintenance/${id}`, { status: newStatus });
      setMaintenanceRequests(prev => 
        prev.map(request => 
          request.id === id ? {...request, status: newStatus} : request
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Delete maintenance request
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this maintenance request?")) {
      try {
        await axios.delete(`http://localhost:5000/api/maintenance/${id}`);
        setMaintenanceRequests(prev => 
          prev.filter(request => request.id !== id)
        );
      } catch (err) {
        console.error("Error deleting request:", err);
        alert("Failed to delete request. Please try again.");
      }
    }
  };

  // Filter maintenance requests
  const filteredRequests = maintenanceRequests.filter(request => {
    const statusMatch = selectedStatus === "All" || request.status === selectedStatus;
    const priorityMatch = selectedPriority === "All" || request.priority === selectedPriority;
    return statusMatch && priorityMatch;
  });

  // Priority color helper
  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "priority-high";
      case "Medium": return "priority-medium";
      case "Low": return "priority-low";
      default: return "";
    }
  };

  // Export to PDF function
  const exportToPDF = () => {
    alert("Export to PDF functionality will be implemented here");
    // Implementation for PDF export would go here
  };

  // Print report function
  const printReport = () => {
    window.print();
  };

  // View details function
  const viewDetails = (id) => {
    navigate(`/maintenance/${id}`, { state: { from: 'manage-maintenance' } });
  };

  return (
    <div className='dashboard-container'>
      
      {/* Sidebar */}
      <aside className='sidebar'>
        <div className='sidebar-header'>
          <img src="/images/logo.png" alt="Logo" className='logo' />
        </div>
        <nav className='sidebar-nav'>
            <ul>
                <li>
                <img src="/images/dashboard.png" alt="Dashboard" className='icon' />
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
            <h1>Manage Campus Maintenance</h1>
            <p>Oversee and respond to maintenance requests for a safe campus environment</p>
          </div>
          <img src="/images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        {/* Dashboard Widgets */}
        <section className='dashboard-widgets'>
          {/* Stats Overview */}
          <div className='maintenance-stats'>
            <div className='stat-card'>
              <h3>Total Issues</h3>
              <p className='stat-number'>{maintenanceRequests.length}</p>
            </div>
            <div className='stat-card'>
              <h3>Pending</h3>
              <p className='stat-number'>{maintenanceRequests.filter(r => r.status === "Pending").length}</p>
            </div>
            <div className='stat-card'>
              <h3>In Progress</h3>
              <p className='stat-number'>{maintenanceRequests.filter(r => r.status === "In Progress").length}</p>
            </div>
            <div className='stat-card'>
              <h3>Completed</h3>
              <p className='stat-number'>{maintenanceRequests.filter(r => r.status === "Completed").length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className='maintenance-filters'>
            <div className='filter-group'>
              <label htmlFor='status-filter'>Status:</label>
              <select 
                id='status-filter' 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className='filter-group'>
              <label htmlFor='priority-filter'>Priority:</label>
              <select 
                id='priority-filter' 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button className='refresh-btn' onClick={fetchMaintenanceRequests}>
              <img src="/images/refresh.png" alt="Refresh" className='icon' />
              Refresh
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchMaintenanceRequests}>Try Again</button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading ? (
            <div className="loading-spinner">
              <p>Loading maintenance requests...</p>
            </div>
          ) : (
            /* Maintenance Requests Table */
            <div className='maintenance-table-container'>
              {maintenanceRequests.length === 0 ? (
                <div className="no-data-message">
                  <p>No maintenance requests found.</p>
                </div>
              ) : (
                <table className='maintenance-table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Priority</th>
                      <th>Reported By</th>
                      <th>Date Reported</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map(request => (
                      <tr key={request.id}>
                        <td>{request.id.substring(0, 8)}...</td>
                        <td>
                          <div className='request-title'>{request.title}</div>
                          <div className='request-description'>{request.description}</div>
                        </td>
                        <td>{request.location}</td>
                        <td>
                          <span className={`priority-badge ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td>{request.reportedBy}</td>
                        <td>{request.dateReported}</td>
                        <td className='actions-cell'>
                          <select 
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            className='status-select'
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <button 
                            onClick={() => handleDelete(request.id)}
                            className='delete-btn'
                            title="Delete Request"
                          >
                            <img src="/images/delete.png" alt="Delete" className='icon' />
                          </button>
                          <button 
                            onClick={() => viewDetails(request.id)}
                            className='details-btn'
                            title="View Details"
                          >
                            <img src="/images/details.png" alt="Details" className='icon' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className='quick-actions'>
            <button className='action-btn export-btn' onClick={exportToPDF}>
              <img src="/images/export.png" alt="Export" className='icon' />
              Export to PDF
            </button>
            <button className='action-btn print-btn' onClick={printReport}>
              <img src="/images/print.png" alt="Print" className='icon' />
              Print Report
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageMaintanance;