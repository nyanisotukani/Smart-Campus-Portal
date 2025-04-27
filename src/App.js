import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './screens/onboarding/Onboarding';
import Register from './auth/Register';
import Login from './auth/Login';
import Admin from './screens/homescreen/admin/Admin';
import Lecturer from './screens/homescreen/lecturer/Lecturer';
import Student from './screens/homescreen/student/Student';
import TimetableWidget from './screens/homescreen/student/timetable/TimetableWidget';
import LecturerTimetable from './screens/homescreen/lecturer/timetable/LecturerTimetable';
import RoomBooking from './screens/homescreen/student/room booking/RoomBooking';
import ReportMaintenance from './screens/homescreen/student/report-maintanance/ReportMaintenance ';
import LecturerRoomBooking from './screens/homescreen/lecturer/room booking/LecturerRoomBooking';
import LecturerReportMaintenance from './screens/homescreen/lecturer/report-maintanance/LecturerReportMaintenance ';
import PostAnnouncements from './screens/homescreen/lecturer/post-announcements/PostAnnouncements';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/lecturer" element={<Lecturer />} />
          <Route path="/student" element={<Student />} />
          <Route path="/student-timetable" element={<TimetableWidget />} />
          <Route path="/lecturer-timetable" element={<LecturerTimetable />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/lecturer-room-booking" element={<LecturerRoomBooking />} />
          <Route path="/report-maintanance" element={<ReportMaintenance />} />
          <Route path="/lecturer-report-maintanance" element={<LecturerReportMaintenance />} />
          <Route path="/post-announcements" element={<PostAnnouncements />} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
