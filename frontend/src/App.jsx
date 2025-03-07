import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentListView from './components/StudentListView';
import AssignmentMarkingInterface from './components/AssignmentMarkingInterface';
import CreateAssignment from './components/CreateAssignment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentListView />} />
      <Route path="/marking" element={<AssignmentMarkingInterface />} />
      <Route path="/create-assignment" element={<CreateAssignment />} />
    </Routes>
  );
}

export default App;
