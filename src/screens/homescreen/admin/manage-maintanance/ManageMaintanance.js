import React, { useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
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

  // Sample maintenance data (would come from API in real app)
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    {
      id: 1,
      title: "Broken projector in LT3",
      description: "The projector in Lecture Theater 3 is not displaying properly and needs replacement.",
      location: "Science Building, Room 305",
      reportedBy: "Dr. Smith (Lecturer)",
      dateReported: "2023-05-15",
      status: "Pending",
      priority: "High",
     
    },
    {
      id: 2,
      title: "Leaking ceiling in Library",
      description: "Water leaking from ceiling near the west wing study area when it rains.",
      location: "Main Library, West Wing",
      reportedBy: "Jane Doe (Student)",
      dateReported: "2023-05-12",
      status: "In Progress",
      priority: "Medium",
      
    },
    {
      id: 3,
      title: "Air conditioning not working",
      description: "AC unit in computer lab 4 is blowing warm air and making strange noises.",
      location: "Engineering Block, Lab 4",
      reportedBy: "John Smith (Student)",
      dateReported: "2023-05-10",
      status: "Completed",
      priority: "High",
      
    },
    {
      id: 4,
      title: "Broken chair in cafeteria",
      description: "Chair at table 12 has a broken leg and is unsafe to use.",
      location: "Student Cafeteria",
      reportedBy: "Sarah Johnson (Student)",
      dateReported: "2023-05-14",
      status: "Pending",
      priority: "Low",
      
    },
    {
      id: 5,
      title: "Faulty door lock",
      description: "Door to the chemistry lab doesn't lock properly, security concern.",
      location: "Chemistry Department, Lab 2",
      reportedBy: "Prof. Brown (Lecturer)",
      dateReported: "2023-05-13",
      status: "Pending",
      priority: "High",
      
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const handleStatusChange = (id, newStatus) => {
    setMaintenanceRequests(prev => 
      prev.map(request => 
        request.id === id ? {...request, status: newStatus} : request
      )
    );
  };

  const handleDelete = (id) => {
    setMaintenanceRequests(prev => 
      prev.filter(request => request.id !== id)
    );
  };

  const filteredRequests = maintenanceRequests.filter(request => {
    const statusMatch = selectedStatus === "All" || request.status === selectedStatus;
    const priorityMatch = selectedPriority === "All" || request.priority === selectedPriority;
    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "priority-high";
      case "Medium": return "priority-medium";
      case "Low": return "priority-low";
      default: return "";
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
            <h1>Manage the maintenance</h1>
            <p>Manage your campus maintanance for safe environment</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        {/* Dashboard Widgets */}
        <section className='dashboard-widgets'>
          {/* Example Widgets (you can add cards/statistics here later) */}
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
            <button className='refresh-btn'>
              <img src="../images/refresh.png" alt="Refresh" className='icon' />
              Refresh
            </button>
          </div>

          {/* Maintenance Requests Table */}
          <div className='maintenance-table-container'>
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
                    <td>{request.id}</td>
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
                      >
                        <img src="../images/delete.png" alt="Delete" className='icon' />
                      </button>
                      <button className='details-btn'>
                        <img src="../images/details.png" alt="Details" className='icon' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className='quick-actions'>
            <button className='action-btn export-btn'>
              <img src="../images/export.png" alt="Export" className='icon' />
              Export to PDF
            </button>
            <button className='action-btn print-btn'>
              <img src="../images/print.png" alt="Print" className='icon' />
              Print Report
            </button>
          </div>
          {/* Example: Total Students, Total Bookings, Pending Maintenance Requests */}
        </section>

      </main>

    </div>
  );
};

export default ManageMaintanance;
