import React, { useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import "../../student/student-dashboard/StudentDashboard.css";
import './ManageTimetable.css'; // Assuming you have a CSS file for styling

const ManageTimetable = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [activeTab, setActiveTab] = useState('lecturers');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Sample timetable data
    const [timetables, setTimetables] = useState({
      lecturers: [
        {
          id: 1,
          name: "Dr. Smith",
          department: "Computer Science",
          courses: ["CS101", "CS202"],
          schedule: {
            monday: ["9:00-11:00", "13:00-15:00"],
            tuesday: ["10:00-12:00"],
            wednesday: ["9:00-11:00"],
            thursday: [],
            friday: ["14:00-16:00"]
          }
        },
        {
          id: 2,
          name: "Prof. Johnson",
          department: "Mathematics",
          courses: ["MATH201", "MATH305"],
          schedule: {
            monday: ["11:00-13:00"],
            tuesday: ["9:00-11:00", "14:00-16:00"],
            wednesday: [],
            thursday: ["10:00-12:00", "13:00-15:00"],
            friday: ["9:00-11:00"]
          }
        }
      ],
      students: [
        {
          id: 1,
          program: "Computer Science",
          year: "2023",
          courses: [
            { code: "CS101", name: "Intro to Programming", schedule: "Mon 9:00-11:00, Wed 9:00-11:00" },
            { code: "MATH201", name: "Discrete Math", schedule: "Tue 9:00-11:00, Thu 10:00-12:00" }
          ]
        },
        {
          id: 2,
          program: "Electrical Engineering",
          year: "2023",
          courses: [
            { code: "EE201", name: "Circuit Theory", schedule: "Mon 13:00-15:00, Fri 14:00-16:00" },
            { code: "MATH305", name: "Advanced Calculus", schedule: "Tue 14:00-16:00, Fri 9:00-11:00" }
          ]
        }
      ]
    });
  
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    const handleAddTimetable = () => {
      // Logic to add new timetable
      navigate("/addnewtimetable");
      
    };
  
    const handleEditTimetable = (id) => {
      // Logic to edit timetable
      console.log("Edit timetable", id);
    };
  
    const handleDeleteTimetable = (id) => {
      // Logic to delete timetable
      console.log("Delete timetable", id);
      setTimetables(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(item => item.id !== id)
      }));
    };
  
    const filteredTimetables = timetables[activeTab].filter(item => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.program?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            {activeTab === 'lecturers' ? (
              <div className='lecturer-timetables'>
                {filteredTimetables.map(lecturer => (
                  <div key={lecturer.id} className='timetable-card'>
                    <div className='card-header'>
                      <h3>{lecturer.name}</h3>
                      <span className='department-badge'>{lecturer.department}</span>
                      <div className='card-actions'>
                        <button 
                          className='edit-btn'
                          onClick={() => handleEditTimetable(lecturer.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className='delete-btn'
                          onClick={() => handleDeleteTimetable(lecturer.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className='card-body'>
                      <div className='courses-list'>
                        <h4>Courses:</h4>
                        <div className='course-tags'>
                          {lecturer.courses.map(course => (
                            <span key={course} className='course-tag'>{course}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className='schedule-grid'>
                        {Object.entries(lecturer.schedule).map(([day, slots]) => (
                          <div key={day} className='schedule-day'>
                            <h5>{day.charAt(0).toUpperCase() + day.slice(1)}</h5>
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
                ))}
              </div>
            ) : (
              <div className='student-timetables'>
                {filteredTimetables.map(student => (
                  <div key={student.id} className='timetable-card'>
                    <div className='card-header'>
                      <h3>{student.program} - Year {student.year}</h3>
                      <div className='card-actions'>
                        <button 
                          className='edit-btn'
                          onClick={() => handleEditTimetable(student.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className='delete-btn'
                          onClick={() => handleDeleteTimetable(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className='card-body'>
                      <table className='student-schedule'>
                        <thead>
                          <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Schedule</th>
                          </tr>
                        </thead>
                        <tbody>
                          {student.courses.map((course, i) => (
                            <tr key={i}>
                              <td>{course.code}</td>
                              <td>{course.name}</td>
                              <td>{course.schedule}</td>
                            </tr>
                          ))}
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
          </div>
        </section>
        </section>
      </main>
    </div>
  );
};
export default ManageTimetable;
