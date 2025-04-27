import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../student/student-dashboard/StudentDashboard.css';


const LecturerReportMaintenance  = () => {
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
  const [issue, setIssue] = useState({
    location: "",
    description: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Simulate fetching user data
    setUser({
      name: "Nyaniso Tukani",
      email: "nyaniso@example.com",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Maintenance Report:', {
      name: user.name,
      email: user.email,
      location: issue.location,
      description: issue.description,
    });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setIssue({ location: "", description: "" });
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

      <main className='main-content'>

        <div className='heading'>
            <h1> Smart Campus Services Portal</h1>
            <div className='student-info'>
                <h2>{state?.name || "Lecturer"}</h2>
                <p>Lecturer</p>
            </div>
        </div>
        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{currentDate}</h4>
            <h1>Report Maintenance Issue</h1>
            <p>Let us know about any facility problems you encounter</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image'/>
        </section>

        <section className='dashboard-widgets'>
            <form className="maintenance-form" onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Name</label>
                <input type="text" value={user.name} readOnly />
                </div>
                <div className="form-group">
                <label>Email</label>
                <input type="email" value={user.email} readOnly />
                </div>
                <div className="form-group">
                <label>Location</label>
                <input 
                    type="text" 
                    placeholder="e.g., Block C, Room 101" 
                    value={issue.location}
                    onChange={(e) => setIssue({ ...issue, location: e.target.value })}
                    required
                />
                </div>
                <div className="form-group">
                <label>Issue Description</label>
                <textarea
                    placeholder="Describe the problem..."
                    value={issue.description}
                    onChange={(e) => setIssue({ ...issue, description: e.target.value })}
                    required
                ></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Report</button>
            </form>
            </section>

            {showPopup && (
            <div className="popup">
                <div className="popup-content">
                <h2>Report Submitted!</h2>
                <p>Thank you for helping us keep the campus safe.</p>
                <button onClick={closePopup} className="close-btn">Close</button>
                </div>
            </div>
            )}


        
      </main>
    </div>
  );
};

export default LecturerReportMaintenance ;
