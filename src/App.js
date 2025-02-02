// src/App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const API_URL = 'https://student-database-backend-z9ga.onrender.com/students';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setStudents(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { name, className, rollNumber, bloodGroup };

    if (editIndex !== null) {
      axios.put(`${API_URL}/${students[editIndex]._id}`, studentData)
        .then(response => {
          const updatedStudents = [...students];
          updatedStudents[editIndex] = response.data;
          setStudents(updatedStudents);
          resetForm();
        })
        .catch(error => console.log(error));
    } else {
      axios.post(API_URL, studentData)
        .then(response => {
          setStudents([...students, response.data]);
          resetForm();
        })
        .catch(error => console.log(error));
    }
  };

  const handleEdit = (index) => {
    setName(students[index].name);
    setClassName(students[index].className);
    setRollNumber(students[index].rollNumber);
    setBloodGroup(students[index].bloodGroup);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    axios.delete(`${API_URL}/${students[index]._id}`)
      .then(() => {
        setStudents(students.filter((_, i) => i !== index));
      })
      .catch(error => console.log(error));
  };

  const resetForm = () => {
    setName('');
    setClassName('');
    setRollNumber('');
    setBloodGroup('');
    setEditIndex(null);
  };

  return (
    <div className="container mt-4">
      <h2>Student Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="text" className="form-control mt-2" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Class" required />
        <input type="text" className="form-control mt-2" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Roll Number" required />
        <input type="text" className="form-control mt-2" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} placeholder="Blood Group" required />
        <button type="submit" className="btn btn-primary mt-3">{editIndex !== null ? 'Update' : 'Add'} Student</button>
      </form>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll Number</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.className}</td>
              <td>{student.rollNumber}</td>
              <td>{student.bloodGroup}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
