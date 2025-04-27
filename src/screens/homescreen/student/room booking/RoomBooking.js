import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../student-dashboard/StudentDashboard.css';
import './RoomBooking.css'; 

const RoomBooking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const [rooms] = useState([
    { id: 1, name: "Study Room A", status: "Available" },
    { id: 2, name: "Study Room B", status: "Fully Booked" },
    { id: 3, name: "Conference Room 1", status: "Available" },
    { id: 4, name: "Lab Room", status: "Fully Booked" },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null); // for popup

  useEffect(() => {
    // Simulate fetching user data
    setUser({
      name: "Nyaniso",
      surname: "Tukani",
      email: "nyaniso@example.com",
    });
  }, []);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
  };

  const confirmBooking = () => {
    console.log("Venue Booked");
    setSelectedRoom(null); // close the popup
  };

  const closePopup = () => {
    setSelectedRoom(null);
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
                <h2>{state?.name || "Student"}</h2>
                <p>Student</p>
            </div>
        </div>
        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{currentDate}</h4>
            <h1>Book a Room</h1>
            <p>Look at our available Lecture Halls or Student Centres and Book one</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image'/>
        </section>

        <section className='dashboard-widgets'>
          <div className="rooms-grid">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <h3>{room.name}</h3>
                <p className={room.status === "Available" ? "available" : "booked"}>
                  {room.status}
                </p>
                <button
                  disabled={room.status !== "Available"}
                  className={room.status === "Available" ? "book-btn" : "booked-btn"}
                  onClick={() => handleBookNow(room)}
                >
                  {room.status === "Available" ? "Book Now" : "Fully Booked"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Popup Modal */}
        {selectedRoom && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Confirm Booking</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Surname:</strong> {user.surname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Venue:</strong> {selectedRoom.name}</p>
              <p><strong>Date:</strong> {currentDate}</p>
              <div className="popup-buttons">
                <button onClick={confirmBooking} className="confirm-btn">Book</button>
                <button onClick={closePopup} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RoomBooking;
