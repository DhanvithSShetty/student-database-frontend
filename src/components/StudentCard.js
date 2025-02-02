// src/components/StudentCard.js
import React from 'react';

const StudentCard = ({ student, handleEdit, handleDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{student.name}</h5>
          <p className="card-text">Class: {student.className}</p>
          <p className="card-text">Roll Number: {student.rollNumber}</p>
          <p className="card-text">Blood Group: {student.bloodGroup}</p>
          <button
            className="btn btn-warning me-2"
            onClick={() => handleEdit(student)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(student._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
