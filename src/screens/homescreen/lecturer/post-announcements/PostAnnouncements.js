import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../student/student-dashboard/StudentDashboard.css';
import './PostAnnouncements.css'; // Assuming you have a CSS file for styling
const PostAnnouncements = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
    category: "General",
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setUser({
      name: "Nyaniso Tukani",
      email: "nyaniso@example.com",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Announcement:', {
      lecturerName: user.name,
      lecturerEmail: user.email,
      title: announcement.title,
      message: announcement.message,
      category: announcement.category,
      date: currentDate,
    });
    setShowPopup(true);
    setAnnouncement({ title: "", message: "", category: "General" });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <a href="#dashboard">Dashboard</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=34990&format=png&color=000000" alt="Timetable" className='icon' />
        <a href="#timetable">Timetable</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=8080&format=png&color=000000" alt="Room Booking" className='icon' />
        <a href="#booking">Room Booking</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=qvUK2KCJbwJa&format=png&color=000000" alt="Post Announcements" className='icon' />
        <a href="#booking">Post Announcements</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=116946&format=png&color=000000" alt="Report Maintenance" className='icon' />
        <a href="#maintenance">Report Maintenance</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notifications" className='icon' />
        <a href="#notifications">Notifications</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=ShVC6pYnGs5L&format=png&color=000000" alt="Profile" className='icon' />
        <a href="#profile">Profile</a>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" alt="Logout" className='icon' />
        <a href="#logout">Logout</a>
      </li>
    </ul>
  </nav>
      </aside>

      {/* Main Content */}
      <main className='main-content'>
        <div className='heading'>
          <h1>Smart Campus Services Portal</h1>
          <div className='student-info'>
            <h2>{state?.name || "Lecturer"}</h2>
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
          {/* Announcement Form */}
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
