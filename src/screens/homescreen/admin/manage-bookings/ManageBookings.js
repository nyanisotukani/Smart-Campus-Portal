import React, { useState } from 'react';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageBookings.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ManageBookings = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [bookings, setBookings] = useState([
    { id: 1, room: "Room 101", time: "10:00 AM - 11:00 AM", date: "2023-05-15", status: "Pending", requestedBy: "John Doe" },
    { id: 2, room: "Room 102", time: "2:00 PM - 3:30 PM", date: "2023-05-16", status: "Pending", requestedBy: "Jane Smith" },
    { id: 3, room: "Room 103", time: "1:00 PM - 2:00 PM", date: "2023-05-15", status: "Pending", requestedBy: "Robert Johnson" },
    { id: 4, room: "Auditorium", time: "9:00 AM - 12:00 PM", date: "2023-05-17", status: "Accepted", requestedBy: "University Events" },
    { id: 5, room: "Lab 205", time: "3:00 PM - 5:00 PM", date: "2023-05-18", status: "Declined", requestedBy: "Physics Department" },
  ]);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleBookingStatusChange = (id, status) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === "All" || booking.status === filter;
    const matchesSearch = booking.room.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         booking.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors = {
    Pending: "#FFA500", // Orange
    Accepted: "#4CAF50", // Green
    Declined: "#F44336", // Red
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
            <h1>Manage Bookings</h1>
            <p>Review and manage venue booking requests</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        <section className='dashboard-widgets'>
          <div className="bookings-controls">
            <div className="search-filter-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by room or requester..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={filter === "All" ? "active" : ""}
                  onClick={() => setFilter("All")}
                >
                  All Bookings
                </button>
                <button 
                  className={filter === "Pending" ? "active" : ""}
                  onClick={() => setFilter("Pending")}
                >
                  Pending Approval
                </button>
                <button 
                  className={filter === "Accepted" ? "active" : ""}
                  onClick={() => setFilter("Accepted")}
                >
                  Accepted
                </button>
                <button 
                  className={filter === "Declined" ? "active" : ""}
                  onClick={() => setFilter("Declined")}
                >
                  Declined
                </button>
              </div>
            </div>
          </div>

          <div className="bookings-table-container">
            <table className='bookings-table'>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Requested By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.room}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>{booking.requestedBy}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: statusColors[booking.status] || "#777" }}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        {booking.status === "Pending" ? (
                          <div className="action-buttons">
                            <button 
                              className="accept-btn" 
                              onClick={() => handleBookingStatusChange(booking.id, "Accepted")}
                            >
                              Accept
                            </button>
                            <button 
                              className="decline-btn" 
                              onClick={() => handleBookingStatusChange(booking.id, "Declined")}
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="reset-btn" 
                            onClick={() => handleBookingStatusChange(booking.id, "Pending")}
                          >
                            Reset
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">
                      No bookings found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageBookings;