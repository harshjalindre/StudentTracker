import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentListView = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/studentTracker/backend/student/getStudents')  // Adjust the URL for your API
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl text-center font-bold text-red-500 mb-3">Student List</h1>
      <table className="w-full border border-black">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border border-black">Name</th>
            <th className="p-2 border border-black">Assignment</th>
            <th className="p-2 border border-black">Status</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {students.map((student, index) => (
            <tr key={`${student.id}-${index}`}>  {/* Make sure the key is unique */}
              <td className="border border-gray-300 p-2 dark:border-gray-700">{student.name}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-700">{student.assignment_name}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-700">{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListView;
