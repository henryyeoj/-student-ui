import './App.css';
import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  
  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/students');
      if (!res.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []); 


  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management System</h1>
      <StudentForm
        fetchStudents={fetchStudents}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />
      <StudentList
        students={students}
        fetchStudents={fetchStudents}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
}
   

export default App;
