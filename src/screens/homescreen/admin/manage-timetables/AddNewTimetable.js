import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../student/student-dashboard/StudentDashboard.css";
import "./AddNewTimetable.css"; // Import your CSS file for styling

const AddNewTimetable = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const [userType, setUserType] = useState(null); // 'student' or 'lecturer'
  const [lecturerData, setLecturerData] = useState({
    name: '',
    department: '',
    courses: [],
    schedule: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  });

  const [studentData, setStudentData] = useState({
    groupName: '',
    courses: []
  });

  const [newCourse, setNewCourse] = useState({ code: '', name: '', schedule: '' });
  const [currentDay, setCurrentDay] = useState('Monday');
  const [newTimeSlot, setNewTimeSlot] = useState({ start: '', end: '' });

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleLecturerInputChange = (e) => {
    const { name, value } = e.target;
    setLecturerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addLecturerCourse = () => {
    if (newCourse.code.trim() && !lecturerData.courses.includes(newCourse.code.trim())) {
      setLecturerData(prev => ({
        ...prev,
        courses: [...prev.courses, newCourse.code.trim()]
      }));
      setNewCourse({ code: '', name: '', schedule: '' });
    }
  };

  const addStudentCourse = () => {
    if (newCourse.code.trim() && newCourse.name.trim()) {
      const course = {
        code: newCourse.code.trim(),
        name: newCourse.name.trim(),
        schedule: newCourse.schedule.trim()
      };
      
      setStudentData(prev => ({
        ...prev,
        courses: [...prev.courses, course]
      }));
      
      setNewCourse({ code: '', name: '', schedule: '' });
    }
  };

  const removeLecturerCourse = (courseToRemove) => {
    setLecturerData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course !== courseToRemove)
    }));
  };

  const removeStudentCourse = (courseToRemove) => {
    setStudentData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.code !== courseToRemove.code)
    }));
  };

  const addTimeSlot = () => {
    if (newTimeSlot.start && newTimeSlot.end) {
      const updatedSchedule = { ...lecturerData.schedule };
      updatedSchedule[currentDay] = [...updatedSchedule[currentDay], `${newTimeSlot.start}-${newTimeSlot.end}`];
      
      setLecturerData(prev => ({
        ...prev,
        schedule: updatedSchedule
      }));
      
      setNewTimeSlot({ start: '', end: '' });
    }
  };

  const removeTimeSlot = (day, slotToRemove) => {
    const updatedSchedule = { ...lecturerData.schedule };
    updatedSchedule[day] = updatedSchedule[day].filter(slot => slot !== slotToRemove);
    
    setLecturerData(prev => ({
      ...prev,
      schedule: updatedSchedule
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'lecturer') {
      console.log('Lecturer timetable submitted:', lecturerData);
      // Submit lecturer data
    } else {
      console.log('Student timetable submitted:', studentData);
      // Submit student data
    }
    navigate(-1); // Go back to previous page
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  if (!userType) {
    return (
      <div className="user-type-selection">
        <h2>Add New Timetable</h2>
        <p>Select the type of timetable you want to create:</p>
        
        <div className="selection-cards">
          <div className="selection-card" onClick={() => handleUserTypeSelect('lecturer')}>
            <div className="card-icon">👨‍🏫</div>
            <h3>Lecturer Timetable</h3>
            <p>Create a schedule for a faculty member</p>
          </div>
          
          <div className="selection-card" onClick={() => handleUserTypeSelect('student')}>
            <div className="card-icon">👩‍🎓</div>
            <h3>Student Timetable</h3>
            <p>Create a schedule for a student group</p>
          </div>
        </div>
      </div>
    );
  }



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
            <h1>Add New Timetable</h1>
            <p>You can add the new timetables for the Students and the Lecturers.</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        {/* Dashboard Widgets */}
        <section className='dashboard-widgets'>
          {/* User Management Tools */}
          <div className="add-timetable-container">
      <div className="add-timetable-header">
        <h2>{userType === 'lecturer' ? 'Add New Lecturer Timetable' : 'Add New Student Timetable'}</h2>
        <button onClick={() => setUserType(null)} className="back-button">
          &larr; Change Type
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="timetable-form">
        {userType === 'lecturer' ? (
          <>
            <div className="form-section">
              <label>
                Lecturer Name
                <input
                  type="text"
                  name="name"
                  value={lecturerData.name}
                  onChange={handleLecturerInputChange}
                  placeholder="e.g. Dr. Smith"
                  required
                />
              </label>
              
              <label>
                Department
                <input
                  type="text"
                  name="department"
                  value={lecturerData.department}
                  onChange={handleLecturerInputChange}
                  placeholder="e.g. Computer Science"
                  required
                />
              </label>
            </div>
            
            <div className="form-section">
              <h3>Courses Taught</h3>
              <div className="courses-input">
                <input
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                  placeholder="Course code (e.g. CS101)"
                />
                <button type="button" onClick={addLecturerCourse} className="add-button">
                  Add Course
                </button>
              </div>
              
              <div className="courses-list">
                {lecturerData.courses.map((course, index) => (
                  <div key={index} className="course-tag">
                    {course}
                    <button type="button" onClick={() => removeLecturerCourse(course)} className="remove-button">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Teaching Schedule</h3>
              <div className="schedule-controls">
                <div className="day-selector">
                  <label>Select Day:</label>
                  <select value={currentDay} onChange={(e) => setCurrentDay(e.target.value)}>
                    {Object.keys(lecturerData.schedule).map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div className="time-input">
                  <label>Time Slot:</label>
                  <input
                    type="time"
                    value={newTimeSlot.start}
                    onChange={(e) => setNewTimeSlot({...newTimeSlot, start: e.target.value})}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={newTimeSlot.end}
                    onChange={(e) => setNewTimeSlot({...newTimeSlot, end: e.target.value})}
                  />
                  <button type="button" onClick={addTimeSlot} className="add-button">
                    Add Slot
                  </button>
                </div>
              </div>
              
              <div className="schedule-display">
                <h4>{currentDay}'s Schedule</h4>
                {lecturerData.schedule[currentDay].length > 0 ? (
                  <ul>
                    {lecturerData.schedule[currentDay].map((slot, index) => (
                      <li key={index}>
                        {slot}
                        <button type="button" onClick={() => removeTimeSlot(currentDay, slot)} className="remove-button">
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No classes scheduled for {currentDay}</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="form-section">
              <label>
                Student Group/Year
                <input
                  type="text"
                  name="groupName"
                  value={studentData.groupName}
                  onChange={handleStudentInputChange}
                  placeholder="e.g. Computer Science - Year 2023"
                  required
                />
              </label>
            </div>
            
            <div className="form-section">
              <h3>Courses Enrolled</h3>
              <div className="course-input-grid">
                <input
                  type="text"
                  name="code"
                  value={newCourse.code}
                  onChange={handleCourseInputChange}
                  placeholder="Course code (e.g. CS101)"
                />
                <input
                  type="text"
                  name="name"
                  value={newCourse.name}
                  onChange={handleCourseInputChange}
                  placeholder="Course name (e.g. Intro to Programming)"
                />
                <input
                  type="text"
                  name="schedule"
                  value={newCourse.schedule}
                  onChange={handleCourseInputChange}
                  placeholder="Schedule (e.g. Mon 9:00-11:00, Wed 9:00-11:00)"
                />
                <button type="button" onClick={addStudentCourse} className="add-button">
                  Add Course
                </button>
              </div>
              
              <div className="courses-table">
                <table>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Schedule</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.courses.map((course, index) => (
                      <tr key={index}>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.schedule}</td>
                        <td>
                          <button type="button" onClick={() => removeStudentCourse(course)} className="remove-button">
                            × Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {studentData.courses.length === 0 && (
                  <p className="no-courses">No courses added yet</p>
                )}
              </div>
            </div>
          </>
        )}
        
        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Save Timetable
          </button>
        </div>
      </form>
    </div>
      
        </section>

      </main>

    </div>
  );
};

export default AddNewTimetable;
