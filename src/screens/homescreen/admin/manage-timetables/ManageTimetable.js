import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageTimetable.css';

const ManageTimetable = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [activeTab, setActiveTab] = useState('lecturers');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for timetables
    const [timetables, setTimetables] = useState({
      lecturers: [],
      students: []
    });
  
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Fetch timetables from API
    useEffect(() => {
      const fetchTimetables = async () => {
        try {
          setLoading(true);
          // Get the auth token from localStorage
          const token = localStorage.getItem('token');
          
          if (!token) {
            navigate('/login');
            return;
          }

          // Fetch all timetables
          const response = await axios.get('https://smart-campus-backend-gz8b.onrender.com/api/timetable', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            // Separate the timetables by type
            const lecturerTimetables = response.data.data.filter(
              timetable => timetable.timetableType === 'lecturer'
            );
            
            const studentTimetables = response.data.data.filter(
              timetable => timetable.timetableType === 'student'
            );

            setTimetables({
              lecturers: lecturerTimetables,
              students: studentTimetables
            });
          }
          
          setLoading(false);
        } catch (err) {
          console.error('Error fetching timetables:', err);
          setError('Failed to load timetables. Please try again later.');
          setLoading(false);
        }
      };

      fetchTimetables();
    }, [navigate]);
  
    const handleAddTimetable = () => {
      navigate('/addnewtimetable');
    };
  
    const handleEditTimetable = (id) => {
      navigate(`/edit-timetable/${id}`);
    };
  
    const handleDeleteTimetable = async (id) => {
      try {
        // Get the auth token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        // Confirm before deleting
        if (!window.confirm('Are you sure you want to delete this timetable?')) {
          return;
        }

        const response = await axios.delete(`https://smart-campus-backend-gz8b.onrender.com/api/timetable/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          // Remove the deleted timetable from state
          setTimetables(prev => ({
            lecturers: prev.lecturers.filter(item => item._id !== id),
            students: prev.students.filter(item => item._id !== id)
          }));
          
          alert('Timetable deleted successfully');
        }
      } catch (err) {
        console.error('Error deleting timetable:', err);
        alert('Failed to delete timetable. Please try again.');
      }
    };
  
    const filteredTimetables = timetables[activeTab].filter(item => {
      if (activeTab === 'lecturers') {
        return (
          item.lecturerDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.lecturerDetails?.department?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return (
          item.groupDetails?.program?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });

    // Helper function to format schedule for display
    const formatSchedule = (timeSlots) => {
      // Group time slots by day
      const scheduleByDay = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      };

      timeSlots.forEach(slot => {
        scheduleByDay[slot.day].push(`${slot.startTime}-${slot.endTime}`);
      });

      return scheduleByDay;
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
            <h1>Manage the Timetables</h1>
            <p>Manage your campus timetables</p>
          </div>
          <img src="../images/welcome.png" alt="Welcome" className='welcome-image' />
        </section>

        {/* Dashboard Widgets */}
        <section className='dashboard-widgets'>
        <section className='timetable-management'>
          <div className='timetable-header'>
            <div className='timetable-tabs'>
              <button 
                className={`tab-btn ${activeTab === 'lecturers' ? 'active' : ''}`}
                onClick={() => setActiveTab('lecturers')}
              >
                Lecturers
              </button>
              <button 
                className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                Students
              </button>
            </div>
            
            <div className='timetable-actions'>
              <div className='search-box'>
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className='search-icon'>🔍</span>
              </div>
              <button className='add-btn' onClick={handleAddTimetable}>
                <span>+</span> Add New Timetable
              </button>
            </div>
          </div>

          <div className='timetable-content'>
            {loading ? (
              <div className="loading-container">
                <p>Loading timetables...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p>{error}</p>
              </div>
            ) : (
              <>
                {activeTab === 'lecturers' ? (
                  <div className='lecturer-timetables'>
                    {filteredTimetables.map((lecturer) => {
                      const schedule = formatSchedule(lecturer.timeSlots || []);
                      
                      return (
                        <div key={lecturer._id} className='timetable-card'>
                          <div className='card-header'>
                            <h3>{lecturer.lecturerDetails.name}</h3>
                            <span className='department-badge'>{lecturer.lecturerDetails.department}</span>
                            <div className='card-actions'>
                              <button 
                                className='edit-btn'
                                onClick={() => handleEditTimetable(lecturer._id)}
                              >
                                Edit
                              </button>
                              <button 
                                className='delete-btn'
                                onClick={() => handleDeleteTimetable(lecturer._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          
                          <div className='card-body'>
                            <div className='academic-info'>
                              <p><strong>Academic Year:</strong> {lecturer.academicYear}</p>
                              <p><strong>Semester:</strong> {lecturer.semester}</p>
                            </div>
                            <div className='courses-list'>
                              <h4>Courses:</h4>
                              <div className='course-tags'>
                                {lecturer.courses && lecturer.courses.map((course, idx) => (
                                  <span key={idx} className='course-tag'>{course}</span>
                                ))}
                                {(!lecturer.courses || lecturer.courses.length === 0) && (
                                  <span className='no-courses'>No courses assigned</span>
                                )}
                              </div>
                            </div>
                            
                            <div className='schedule-grid'>
                              {Object.entries(schedule).map(([day, slots]) => (
                                <div key={day} className='schedule-day'>
                                  <h5>{day}</h5>
                                  {slots.length > 0 ? (
                                    <ul>
                                      {slots.map((slot, i) => (
                                        <li key={i}>{slot}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className='no-class'>No classes</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className='student-timetables'>
                    {filteredTimetables.map((student) => (
                      <div key={student._id} className='timetable-card'>
                        <div className='card-header'>
                          <h3>{student.groupDetails.program} - Year {student.groupDetails.year}</h3>
                          <div className='card-actions'>
                            <button 
                              className='edit-btn'
                              onClick={() => handleEditTimetable(student._id)}
                            >
                              Edit
                            </button>
                            <button 
                              className='delete-btn'
                              onClick={() => handleDeleteTimetable(student._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        <div className='card-body'>
                          <div className='academic-info'>
                            <p><strong>Academic Year:</strong> {student.academicYear}</p>
                            <p><strong>Semester:</strong> {student.semester}</p>
                          </div>
                          <table className='student-schedule'>
                            <thead>
                              <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Schedule</th>
                              </tr>
                            </thead>
                            <tbody>
                              {student.courses && student.courses.map((course, i) => (
                                <tr key={i}>
                                  <td>{course.code}</td>
                                  <td>{course.name}</td>
                                  <td>{course.schedule}</td>
                                </tr>
                              ))}
                              {(!student.courses || student.courses.length === 0) && (
                                <tr>
                                  <td colSpan="3" className="no-courses">No courses available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {filteredTimetables.length === 0 && (
                  <div className='no-results'>
                    <img src="../images/no-data.png" alt="No results" />
                    <p>No timetables found matching your search</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        </section>
      </main>
    </div>
  );
};
export default ManageTimetable;