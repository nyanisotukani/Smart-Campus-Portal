import React, { useState, useEffect } from 'react';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageBookings.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageBookings = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookings from the server
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/booking/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Transform the data to match our component structure
        const formattedBookings = response.data.map(booking => ({
          id: booking._id,
          room: booking.roomDetails ? booking.roomDetails.name : 'Unknown Room',
          date: booking.date,
          time: `${booking.startTime} - ${booking.endTime}`,
          status: booking.status || 'Pending',
          requestedBy: booking.user ? `${booking.user.name || ''} ${booking.user.surname || ''}`.trim() : 'Unknown'
        }));
        
        setBookings(formattedBookings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleBookingStatusChange = async (id, status) => {
    try {
      // Update booking status on the server
      await axios.patch(
        `http://localhost:5000/api/booking/${id}/status`,
        { status }, // this is the request body
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      
      // Update local state
      const updatedBookings = bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      );
      
      setBookings(updatedBookings);
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status. Please try again.');
    }
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

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If direct parsing fails, try to parse YYYY-MM-DD format
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
            {loading ? (
              <div className="loading-spinner">Loading bookings...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
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
                        <td>{formatDate(booking.date)}</td>
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
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageBookings;