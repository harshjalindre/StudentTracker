import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentMarkingInterface = () => {
  const [marks, setMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState(0);
  const [grade, setGrade] = useState('');
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [assignmentComponents, setAssignmentComponents] = useState([]);
  const [maxMarks, setMaxMarks] = useState({});
  const [totalMaxMarks, setTotalMaxMarks] = useState(0);

  useEffect(() => {
    // Fetch students and assignments from the server
    // (This is a placeholder; adjust to your actual API)
    axios.get('http://localhost/studentTracker/backend/student/getStudents').then(response => {
      setStudents(response.data);
    });

    axios.get('http://localhost/studentTracker/backend/assignment/getAssignment').then(response => {
      setAssignments(response.data);
    });
  }, []);

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleAssignmentChange = (e) => {
    const assignmentId = e.target.value;
    setSelectedAssignment(assignmentId);

    // Fetch assignment components based on selected assignment
    axios.get(`http://localhost/studentTracker/backend/assignment/getAssignmentComponents/${assignmentId}`).then(response => {
      const components = response.data;
      setAssignmentComponents(components);

      // Update the max marks dynamically
      const maxMarksForAssignment = {};
      let totalMax = 0;
      components.forEach(component => {
        maxMarksForAssignment[component.component_name] = component.max_marks;
        totalMax += component.max_marks;
      });
      setMaxMarks(maxMarksForAssignment);
      setTotalMaxMarks(totalMax);

      // Reset marks and errors
      setMarks({});
      setErrors({});
      setTotalMarks(0);
      setGrade('');
    });
  };

  const handleMarkChange = (component, mark) => {
    const newMark = mark < 0 ? 0 : mark > maxMarks[component] ? maxMarks[component] : mark;
    const updatedMarks = { ...marks, [component]: newMark };
    setMarks(updatedMarks);

    // Recalculate total marks
    const total = Object.values(updatedMarks).reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    setTotalMarks(total);

    // Set grade based on total marks
    if (total >= totalMaxMarks * 0.85) setGrade('A');
    else if (total >= totalMaxMarks * 0.7) setGrade('B');
    else setGrade('C');
  };

  const validateMarks = () => {
    let isValid = true;
    let newErrors = {};

    // Validate each component
    Object.keys(marks).forEach(component => {
      if (!marks[component] || isNaN(marks[component])) {
        newErrors[component] = `${component} mark must be a valid number`;
        isValid = false;
      } else if (marks[component] < 0 || marks[component] > maxMarks[component]) {
        newErrors[component] = `${component} mark must be between 0 and ${maxMarks[component]}`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateMarks()) {
      axios.post('http://localhost/studentTracker/backend/grade/submitGrade', {selectedStudent,selectedAssignment, marks, totalMarks, grade })
        .then(response => {
          alert('Grades saved!');
        })
        .catch(error => {
          console.error('Error submitting grades:', error);
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Mark Assignment</h1>

      {/* Student Dropdown */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Student</label>
        <select
          value={selectedStudent}
          onChange={handleStudentChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
      </div>

      {/* Assignment Dropdown */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Select Assignment</label>
        <select
          value={selectedAssignment}
          onChange={handleAssignmentChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select an Assignment</option>
          {assignments.map(assignment => (
            <option key={assignment.id} value={assignment.id}>{assignment.name}</option>
          ))}
        </select>
      </div>

      {/* Displaying Components Based on Assignment */}
      {assignmentComponents.length > 0 && assignmentComponents.map((component) => (
        <div key={component.component_name} className="mb-4">
          <label className="block text-lg font-medium text-gray-700">{component.component_name}</label>
          <input
            type="number"
            value={marks[component.component_name] || ''}
            onChange={e => handleMarkChange(component.component_name, e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[component.component_name] ? 'border-red-500' : ''}`}
          />
          {errors[component.component_name] && (
            <p className="text-sm text-red-500 mt-1">{errors[component.component_name]}</p>
          )}
        </div>
      ))}

      {/* Total Marks and Grade */}
      <div className="mb-4">
        <h3 className="text-xl font-medium text-gray-700">Total Marks: {totalMarks}</h3>
        <h3 className="text-xl font-medium text-gray-700">Grade: {grade}</h3>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit Grades
        </button>
      </div>
    </div>
  );
};

export default AssignmentMarkingInterface;
