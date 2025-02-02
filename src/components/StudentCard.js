// src/components/StudentCard.js
import React from 'react';

const StudentCard = ({ student, handleEdit, handleDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{student.name}</h5>
          <p className="card-text">Age: {student.age}</p>
          <p className="card-text">Grade: {student.grade}</p>
          <button
            className="btn btn-warning mr-2"
            onClick={() => handleEdit(student.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(student.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
