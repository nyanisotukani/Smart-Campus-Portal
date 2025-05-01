import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../student/student-dashboard/StudentDashboard.css';
import './LecturerRoomBooking.css';

const LecturerRoomBooking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentDate = new Date().toISOString().split('T')[0];

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDate, setBookingDate] = useState(currentDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [purpose, setPurpose] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/booking/get-all-rooms');
        setRooms(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      alert('Session expired. Please login again.');
      navigate('/login');
    } else {
      setUser(storedUser);
    }

    fetchRooms();
    generateTimeSlots();
  }, [navigate]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push({
        time: `${hour}:00 - ${hour + 1}:00`,
        available: true, // Simplified to always be available
      });
    }
    setAvailableSlots(slots);
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    generateTimeSlots();
  };

  const confirmBooking = async () => {
    if (!selectedRoom || !selectedRoom._id) {
      alert('No room selected. Please choose a room to book.');
      return;
    }

    const bookingDetails = {
      user: {
        id: user._id,
        name: user.firstName,
        surname: user.lastName,
        email: user.email,
        role: user.role,
      },
      room: selectedRoom._id,
      date: bookingDate,
      startTime,
      endTime,
      purpose: purpose || "Lecture/Meeting", // Default if none
    };

    try {
      const response = await axios.post('http://localhost:5000/api/booking', bookingDetails);
      alert(`Booking confirmed for ${selectedRoom.name} on ${bookingDate} from ${startTime} to ${endTime}`);
      console.log("Server response:", response.data);
      setSelectedRoom(null);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book room. Please try again.');
    }
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
        <button onClick={() => navigate("/lecturer")} className="sidebar-btn">Dashboard</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=34990&format=png&color=000000" alt="Timetable" className='icon' />
        <button onClick={() => navigate('/lecturer-timetable')} className="sidebar-btn">Timetable</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=8080&format=png&color=000000" alt="Room Booking" className='icon' />
        <button onClick={() =>  navigate('/lecturer-room-booking')} className="sidebar-btn">Room Booking</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=116946&format=png&color=000000" alt="Report Maintenance" className='icon' />
        <button onClick={() =>  navigate('/lecturer-report-maintanance')} className="sidebar-btn">Report Maintanance</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notifications" className='icon' />
        <button onClick={() =>  navigate('/post-announcements')} className="sidebar-btn">Post Announcements</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=ShVC6pYnGs5L&format=png&color=000000" alt="Profile" className='icon' />
        <button onClick={() =>  navigate('/profile')} className="sidebar-btn">Profile</button>
      </li>
      <li>
        <img src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" alt="Logout" className='icon' />
        <button onClick={() =>  navigate('/notifications')} className="sidebar-btn">Logout</button>
      </li>
    </ul>
  </nav>
      </aside>

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
            <h1>Book a Room</h1>
            <p>Look at our available Lecture Halls or Student Centres and Book one</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        <section className='dashboard-widgets'>
          <div className="rooms-grid">
            {rooms.map((room) => (
              <div key={room._id} className="room-card">
                <h3>{room.name}</h3>
                <p>{room.type} - {room.location}</p>
                <p>Capacity: {room.capacity}</p>
                <button className="book-btn" onClick={() => handleBookNow(room)}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {selectedRoom && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Confirm Booking</h2>
              <p><strong>Name:</strong> {user.firstName}</p>
              <p><strong>Surname:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Venue:</strong> {selectedRoom.name}</p>
              <p><strong>Date:</strong> {bookingDate}</p>
              <p><strong>Time:</strong> {startTime} to {endTime}</p>
              <input
                type="text"
                placeholder="Purpose of booking"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
              <div className="modal-buttons">
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

export default LecturerRoomBooking;
