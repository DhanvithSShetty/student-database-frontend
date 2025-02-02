// src/components/StudentForm.js
import React, { useState, useEffect } from 'react';

const StudentForm = ({ studentToEdit, handleSave }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setClassName(studentToEdit.className);
      setRollNumber(studentToEdit.rollNumber);
      setBloodGroup(studentToEdit.bloodGroup);
    }
  }, [studentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && className && rollNumber && bloodGroup) {
      handleSave({
        _id: studentToEdit ? studentToEdit._id : null,
        name,
        className,
        rollNumber,
        bloodGroup,
      });
      setName('');
      setClassName('');
      setRollNumber('');
      setBloodGroup('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
        {studentToEdit ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
