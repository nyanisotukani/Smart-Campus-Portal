import React, { useState } from 'react';
import axios from 'axios';

const CreateTimetable = () => {
  const [type, setType] = useState('lecturer');
  const [form, setForm] = useState({
    name: '',
    department: '',
    courses: '',
    program: '',
    year: '',
    studentCourses: [],
    schedule: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    }
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleScheduleChange = (day, slots) => {
    setForm(prev => ({
      ...prev,
      schedule: { ...prev.schedule, [day]: slots.split(',').map(s => s.trim()) }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type,
      ...(type === 'lecturer'
        ? {
            name: form.name,
            department: form.department,
            courses: form.courses.split(',').map(c => c.trim()),
            schedule: form.schedule
          }
        : {
            program: form.program,
            year: form.year,
            studentCourses: form.studentCourses
          })
    };

    try {
        const token = localStorage.getItem('token');

        const res = await axios.post('http://localhost:5000/api/timetables', payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      alert('Timetable created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create timetable');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="lecturer">Lecturer</option>
        <option value="student">Student</option>
      </select>

      {type === 'lecturer' ? (
        <>
          <input name="name" placeholder="Lecturer Name" onChange={handleChange} />
          <input name="department" placeholder="Department" onChange={handleChange} />
          <input name="courses" placeholder="Courses (comma-separated)" onChange={handleChange} />
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map(day => (
            <input
              key={day}
              placeholder={`${day} slots (comma-separated)`}
              onChange={(e) => handleScheduleChange(day, e.target.value)}
            />
          ))}
        </>
      ) : (
        <>
          <input name="program" placeholder="Program" onChange={handleChange} />
          <input name="year" placeholder="Year" onChange={handleChange} />
          {/* You can expand this to add more student courses dynamically */}
        </>
      )}

      <button type="submit">Create Timetable</button>
    </form>
  );
};

export default CreateTimetable;
