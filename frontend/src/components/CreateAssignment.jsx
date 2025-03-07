import React, { useState } from 'react';
import axios from 'axios';

const CreateAssignment = () => {
  const [assignmentName, setAssignmentName] = useState('');
  const [components, setComponents] = useState([{ name: '', maxMarks: '' }]);
  const [errors, setErrors] = useState({ assignmentName: '', components: [] });

  // Handle changes for the components
  const handleComponentChange = (index, field, value) => {
    const updatedComponents = [...components];
    updatedComponents[index][field] = value;
    setComponents(updatedComponents);
  };

  // Handle adding new component
  const handleAddComponent = () => {
    setComponents([...components, { name: '', maxMarks: '' }]);
  };

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const errors = { assignmentName: '', components: [] };

    // Check if assignment name is empty
    if (assignmentName.trim() === '') {
      errors.assignmentName = 'Assignment name is required';
      isValid = false;
    }

    // Check if all components have a valid name and max marks
    components.forEach((component, index) => {
      const componentErrors = {};
      if (component.name.trim() === '') {
        componentErrors.name = 'Component name is required';
        isValid = false;
      }
      if (component.maxMarks.trim() === '' || isNaN(component.maxMarks)) {
        componentErrors.maxMarks = 'Max Marks must be a valid number';
        isValid = false;
      }

      errors.components[index] = componentErrors;
    });

    setErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const data = { name: assignmentName, components };
      axios.post('http://localhost/studentTracker/backend/assignment/createAssignment', data)
        .then(response => {
          alert('Assignment created successfully!');
        })
        .catch(error => {
          console.error('Error creating assignment:', error);
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create New Assignment</h1>

      {/* Assignment Name Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Assignment Name"
          value={assignmentName}
          onChange={e => setAssignmentName(e.target.value)}
          className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.assignmentName ? 'border-red-500' : ''}`}
        />
        {errors.assignmentName && (
          <p className="text-sm text-red-500 mt-1">{errors.assignmentName}</p>
        )}
      </div>

      <h3 className="text-2xl font-medium text-gray-700 mb-4">Components</h3>

      {/* Components Inputs */}
      {components.map((component, index) => (
        <div key={index} className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Component Name"
                value={component.name}
                onChange={e => handleComponentChange(index, 'name', e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.components[index]?.name ? 'border-red-500' : ''}`}
              />
              {errors.components[index]?.name && (
                <p className="text-sm text-red-500 mt-1">{errors.components[index]?.name}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                placeholder="Max Marks"
                value={component.maxMarks}
                onChange={e => handleComponentChange(index, 'maxMarks', e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.components[index]?.maxMarks ? 'border-red-500' : ''}`}
              />
              {errors.components[index]?.maxMarks && (
                <p className="text-sm text-red-500 mt-1">{errors.components[index]?.maxMarks}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleAddComponent}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Component
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Create Assignment
        </button>
      </div>
    </div>
  );
};

export default CreateAssignment;
