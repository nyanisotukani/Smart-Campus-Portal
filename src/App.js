import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './screens/onboarding/Onboarding';
import Register from './auth/Register';
import Login from './auth/Login';
import Admin from './screens/homescreen/admin/Admin';
import Lecturer from './screens/homescreen/lecturer/Lecturer';
import Student from './screens/homescreen/student/Student';
import TimetableWidget from './screens/homescreen/student/timetable/TimetableWidget';
import RoomBooking from './screens/homescreen/student/room booking/RoomBooking';
import ReportMaintenance from './screens/homescreen/student/report-maintanance/ReportMaintenance ';



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
          <Route path="/timetable" element={<TimetableWidget />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/report-maintanance" element={<ReportMaintenance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
