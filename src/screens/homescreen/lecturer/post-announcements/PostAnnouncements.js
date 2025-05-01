import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../student/student-dashboard/StudentDashboard.css';
import './PostAnnouncements.css';
import axios from 'axios';

const PostAnnouncements = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Ensure this exists
  const [user, setUser] = useState(null); // null is safer than empty string
  const [showPopup, setShowPopup] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
    category: "General",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      alert('Session expired. Please login again.');
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.post('http://localhost:5000/api/announcement/create', {
        userId: user._id,
        name: user.firstName,
        surname: user.lastName,
        ...announcement
      });

      setShowPopup(true); // FIXED this line
    } catch (error) {
      console.error('Error posting announcement:', error);
      alert('Failed to post announcement. Please try again later.');
    }
  };

  const closePopup = () => setShowPopup(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement(prev => ({
      ...prev,
      [name]: value,
    }));
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
              <button onClick={() => navigate("/lecturer")} className="sidebar-btn">Dashboard</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=34990&format=png&color=000000" alt="Timetable" className='icon' />
              <button onClick={() => navigate('/lecturer-timetable')} className="sidebar-btn">Timetable</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=8080&format=png&color=000000" alt="Room Booking" className='icon' />
              <button onClick={() => navigate('/lecturer-room-booking')} className="sidebar-btn">Room Booking</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=116946&format=png&color=000000" alt="Report Maintenance" className='icon' />
              <button onClick={() => navigate('/lecturer-report-maintanance')} className="sidebar-btn">Report Maintanance</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notifications" className='icon' />
              <button onClick={() => navigate('/post-announcements')} className="sidebar-btn">Post Announcements</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=ShVC6pYnGs5L&format=png&color=000000" alt="Profile" className='icon' />
              <button onClick={() => navigate('/profile')} className="sidebar-btn">Profile</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" alt="Logout" className='icon' />
              <button onClick={() => navigate('/notifications')} className="sidebar-btn">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className='main-content'>
        <div className='heading'>
          <h1>Smart Campus Services Portal</h1>
          <div className='student-info'>
            <h2>{user?.firstName || "Lecturer"}</h2>
            <p>Lecturer</p>
          </div>
        </div>

        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{currentDate}</h4>
            <h1>Post Announcements</h1>
            <p>Update the students about the latest news or reports</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        <section className='dashboard-widgets'>
          <form className="announcement-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={announcement.title}
                onChange={handleChange}
                placeholder="Enter Announcement Title"
                required
              />
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                value={announcement.message}
                onChange={handleChange}
                placeholder="Enter Announcement Details"
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={announcement.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Assignment">Assignment</option>
                <option value="Class Update">Class Update</option>
                <option value="Event">Event</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">Post Announcement</button>
          </form>
        </section>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Announcement Posted!</h2>
              <p>Your announcement has been successfully shared.</p>
              <button onClick={closePopup} className="close-btn">Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PostAnnouncements;
