import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../student-dashboard/StudentDashboard.css';
import './RoomBooking.css';

const RoomBooking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentDate = new Date().toISOString().split('T')[0];
  
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const [rooms] = useState([
    { id: 1, name: "Study Room A"},
    { id: 2, name: "Study Room B"},
    { id: 3, name: "Conference Room 1"},
    { id: 4, name: "Lab Room"},
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDate, setBookingDate] = useState(currentDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [purpose, setPurpose] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Simulate fetching user data
    setUser({
      name: "Nyaniso",
      surname: "Tukani",
      email: "nyaniso@example.com",
    });

    // Simulate fetching available time slots
    generateTimeSlots();
  }, []);

  const generateTimeSlots = () => {
    // This would normally come from an API
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push({
        time: `${hour}:00 - ${hour + 1}:00`,
        available: Math.random() > 0.3 // Randomly make some slots unavailable
      });
    }
    setAvailableSlots(slots);
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    generateTimeSlots(); // Refresh slots when room changes
  };

  const confirmBooking = () => {
    // Here you would send the booking data to your backend
    const bookingDetails = {
      user,
      room: selectedRoom,
      date: bookingDate,
      startTime,
      endTime,
      purpose
    };
    
    console.log("Booking confirmed:", bookingDetails);
    alert(`Booking confirmed for ${selectedRoom.name} on ${bookingDate} from ${startTime} to ${endTime}`);
    setSelectedRoom(null);
  };

  const closePopup = () => {
    setSelectedRoom(null);
  };

  const formatDisplayDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
              <button onClick={() => navigate("/student")} className="sidebar-btn">Dashboard</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=34990&format=png&color=000000" alt="Timetable" className='icon' />
              <button onClick={() => navigate('/student-timetable')} className="sidebar-btn">Timetable</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=8080&format=png&color=000000" alt="Room Booking" className='icon' />
              <button onClick={() => navigate('/room-booking')} className="sidebar-btn active">Room Booking</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=116946&format=png&color=000000" alt="Report Maintenance" className='icon' />
              <button onClick={() => navigate('/report-maintanance')} className="sidebar-btn">Report Maintenance</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notifications" className='icon' />
              <button onClick={() => navigate('/notifications')} className="sidebar-btn">Notifications</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=ShVC6pYnGs5L&format=png&color=000000" alt="Profile" className='icon' />
              <button onClick={() => navigate('/profile')} className="sidebar-btn">Profile</button>
            </li>
            <li>
              <img src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" alt="Logout" className='icon' />
              <button onClick={() => navigate('/login')} className="sidebar-btn">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className='main-content'>
        <div className='heading'>
          <h1>Smart Campus Services Portal</h1>
          <div className='student-info'>
            <h2>{state?.name || "Student"}</h2>
            <p>Student</p>
          </div>
        </div>

        <section className='welcome-section'>
          <div className='welcome-text'>
            <h4 className='date'>{formatDisplayDate(currentDate)}</h4>
            <h1>Book a Room</h1>
            <p>Browse available rooms and select your preferred time slot</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image'/>
        </section>

        <section className='dashboard-widgets'>
          <div className="rooms-grid">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-header">
                  <h3>{room.name}</h3>
                </div>
                <button
                  className="book-btn"
                  onClick={() => handleBookNow(room)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {selectedRoom && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-modal" onClick={closePopup}>×</button>
              <h2>Book {selectedRoom.name}</h2>
              
              <div className="booking-form">
                <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    value={bookingDate} 
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={currentDate}
                  />
                </div>
                
                <div className="time-selection">
                  <div className="form-group">
                    <label>Start Time</label>
                    <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                      {availableSlots.map((slot, index) => (
                        <option key={index} value={slot.time.split(' - ')[0]} disabled={!slot.available}>
                          {slot.time.split(' - ')[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>End Time</label>
                    <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                      {availableSlots.map((slot, index) => (
                        <option key={index} value={slot.time.split(' - ')[1]} disabled={!slot.available}>
                          {slot.time.split(' - ')[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Purpose</label>
                  <textarea 
                    value={purpose} 
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Meeting, study session, etc."
                  />
                </div>
              </div>
              
              <div className="modal-buttons">
                <button onClick={confirmBooking} className="confirm-btn">Confirm Booking</button>
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