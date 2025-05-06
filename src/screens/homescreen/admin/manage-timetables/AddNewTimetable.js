import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import "../../student/student-dashboard/StudentDashboard.css";
import "./AddNewTimetable.css";

const AddNewTimetable = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  // Current academic year based on current date
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const defaultAcademicYear = `${currentYear}-${nextYear}`;

  const [userType, setUserType] = useState(null); // 'student' or 'lecturer'
  const [lecturerData, setLecturerData] = useState({
    name: '',
    department: '',
    courses: [],
    academicYear: defaultAcademicYear,
    semester: '1', // Default to semester 1
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
    program: '',
    year: '',
    academicYear: defaultAcademicYear,
    semester: '1', // Default to semester 1
    courses: []
  });

  const [newCourse, setNewCourse] = useState({ code: '', name: '', schedule: '' });
  const [currentDay, setCurrentDay] = useState('Monday');
  const [newTimeSlot, setNewTimeSlot] = useState({ start: '', end: '' });

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    // Reset any previous errors
    setError(null);
    setSuccessMessage('');
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

  // Format time slots data for API submission
  const formatTimeSlotsForAPI = (schedule) => {
    const formattedTimeSlots = [];
    
    Object.keys(schedule).forEach(day => {
      schedule[day].forEach(slot => {
        const [startTime, endTime] = slot.split('-');
        // Use the first course as default or empty string if no courses
        const course = lecturerData.courses.length > 0 ? lecturerData.courses[0] : '';
        
        formattedTimeSlots.push({
          day,
          startTime,
          endTime,
          course
        });
      });
    });
    
    return formattedTimeSlots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please log in again.');
        navigate('/login');
        return;
      }

      let response;
      
      if (userType === 'lecturer') {
        // Create a payload for lecturer timetable
        const payload = {
          name: lecturerData.name,
          department: lecturerData.department,
          courses: lecturerData.courses,
          academicYear: lecturerData.academicYear,
          semester: lecturerData.semester,
          timeSlots: formatTimeSlotsForAPI(lecturerData.schedule)
        };
        
        // Make API call to create lecturer timetable
        response = await axios.post(
          'http://localhost:5000/api/timetable/lecturer/create',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        // Create a payload for student timetable
        const payload = {
          program: studentData.program,
          year: studentData.year,
          courses: studentData.courses,
          academicYear: studentData.academicYear,
          semester: studentData.semester
        };
        
        // Make API call to create student timetable
        response = await axios.post(
          'http://localhost:5000/api/timetable/student/create',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      if (response.data.success) {
        setSuccessMessage('Timetable created successfully!');
        setTimeout(() => {
          navigate('/timetables'); // Navigate back to timetable management after success
        }, 2000);
      }
    } catch (err) {
      console.error('Error creating timetable:', err);
      setError(err.response?.data?.message || 'Failed to create timetable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/timetables'); // Navigate back to timetable management
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
          <div className="add-timetable-container">
            <div className="add-timetable-header">
              <h2>{userType === 'lecturer' ? 'Add New Lecturer Timetable' : 'Add New Student Timetable'}</h2>
              <button onClick={() => setUserType(null)} className="back-button">
                &larr; Change Type
              </button>
            </div>
            
            {/* Success and Error messages */}
            {successMessage && (
              <div className="success-message">
                <p>{successMessage}</p>
              </div>
            )}
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="timetable-form">
              {/* Common fields for both types */}
              <div className="form-section">
                <h3>Academic Information</h3>
                <div className="academic-inputs">
                  <label>
                    Academic Year
                    <input
                      type="text"
                      name="academicYear"
                      value={userType === 'lecturer' ? lecturerData.academicYear : studentData.academicYear}
                      onChange={(e) => {
                        if (userType === 'lecturer') {
                          handleLecturerInputChange(e);
                        } else {
                          handleStudentInputChange(e);
                        }
                      }}
                      placeholder="e.g. 2024-2025"
                      required
                    />
                  </label>
                  
                  <label>
                    Semester
                    <select
                      name="semester"
                      value={userType === 'lecturer' ? lecturerData.semester : studentData.semester}
                      onChange={(e) => {
                        if (userType === 'lecturer') {
                          handleLecturerInputChange(e);
                        } else {
                          handleStudentInputChange(e);
                        }
                      }}
                      required
                    >
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                    </select>
                  </label>
                </div>
              </div>
              
              {userType === 'lecturer' ? (
                <>
                  <div className="form-section">
                    <h3>Lecturer Details</h3>
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
                      {lecturerData.courses.length === 0 && (
                        <p className="no-courses">No courses added yet</p>
                      )}
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
                    
                    <div className="weekly-overview">
                      <h4>Weekly Schedule Overview</h4>
                      <div className="schedule-grid">
                        {Object.entries(lecturerData.schedule).map(([day, slots]) => (
                          <div key={day} className="day-column">
                            <h5>{day}</h5>
                            {slots.length > 0 ? (
                              <ul>
                                {slots.map((slot, i) => (
                                  <li key={i}>{slot}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>No classes</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-section">
                    <h3>Student Group Details</h3>
                    <label>
                      Program
                      <input
                        type="text"
                        name="program"
                        value={studentData.program}
                        onChange={handleStudentInputChange}
                        placeholder="e.g. Computer Science"
                        required
                      />
                    </label>
                    
                    <label>
                      Year
                      <input
                        type="text"
                        name="year"
                        value={studentData.year}
                        onChange={handleStudentInputChange}
                        placeholder="e.g. 2"
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
                <button type="button" onClick={handleCancel} className="cancel-button" disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Timetable'}
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