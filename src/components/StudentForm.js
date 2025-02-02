// src/components/StudentForm.js
import React, { useState, useEffect } from 'react';

const StudentForm = ({ studentToEdit, handleSave }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setAge(studentToEdit.age);
      setGrade(studentToEdit.grade);
    }
  }, [studentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && grade) {
      handleSave({ id: studentToEdit ? studentToEdit.id : Date.now(), name, age, grade });
      setName('');
      setAge('');
      setGrade('');
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
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          className="form-control"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Grade</label>
        <input
          type="text"
          className="form-control"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {studentToEdit ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
