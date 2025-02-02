// src/App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Fetch all students when the component loads
  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data))
      .catch(error => console.log(error));
  }, []);

  // Handle adding or updating student data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing student
      const updatedStudent = {
        name,
        className,
        rollNumber,
        bloodGroup
      };

      axios.put(`http://localhost:5000/students/${students[editIndex]._id}`, updatedStudent)
        .then(response => {
          const updatedStudents = [...students];
          updatedStudents[editIndex] = response.data;
          setStudents(updatedStudents);
          setEditIndex(null); // Reset the edit state
          setName('');
          setClassName('');
          setRollNumber('');
          setBloodGroup('');
        })
        .catch(error => console.log(error));
    } else {
      // Add new student
      const newStudent = { name, className, rollNumber, bloodGroup };

      axios.post('http://localhost:5000/students', newStudent)
        .then(response => {
          setStudents([...students, response.data]);
          setName('');
          setClassName('');
          setRollNumber('');
          setBloodGroup('');
        })
        .catch(error => console.log(error));
    }
  };

  // Handle editing a student's data
  const handleEdit = (index) => {
    setName(students[index].name);
    setClassName(students[index].className);
    setRollNumber(students[index].rollNumber);
    setBloodGroup(students[index].bloodGroup);
    setEditIndex(index);
  };

  // Handle deleting a student
  const handleDelete = (index) => {
    const studentId = students[index]._id;

    axios.delete(`http://localhost:5000/students/${studentId}`)
      .then(() => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container mt-4">
      <h2>Student Management</h2>

      {/* Form to add or update students */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Class</label>
          <input
            type="text"
            className="form-control"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Roll Number</label>
          <input
            type="text"
            className="form-control"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Blood Group</label>
          <input
            type="text"
            className="form-control"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editIndex !== null ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      {/* Table to display students */}
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
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
