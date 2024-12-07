import React, { useState } from 'react';
import { PlusCircle, Users, X, Menu, Home } from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [teachers, setTeachers] = useState([
    {
      name: 'John Doe',
      subject: 'Mathematics',
      experience: '5 years',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    },
    {
      name: 'Jane Smith',
      subject: 'Physics',
      experience: '3 years',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    experience: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRemoveTeacher = (index) => {
    const updatedTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(updatedTeachers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeachers([...teachers, formData]);
    setIsTeacherModalOpen(false);
    setFormData({ name: '', subject: '', experience: '', email: '', phone: '' });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-10 shadow-[0px_4px_6px_rgba(0,0,0,0.4)] text-white transition-transform duration-300 ${isMenuOpen ? 'transform-none' : '-translate-x-full'} sm:transform-none sm:relative sm:w-64 sm:block h-screen`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            {/* You can put a logo or branding here */}
          </div>
          <button onClick={toggleMenu} className="sm:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex flex-col p-4 h-full">
          <button className="flex items-center mb-4 bg-yellow-500 text-white p-2 rounded">
            <Home className="mr-2" /> Home
          </button>
          <button onClick={() => setIsCourseModalOpen(true)} className="flex items-center mb-4 text-white p-2 bg-blue-600 rounded">
            <PlusCircle className="mr-2" /> Add Course
          </button>
          <button onClick={() => setIsTeacherModalOpen(true)} className="flex items-center mb-4 text-white p-2 bg-green-600 rounded">
            <PlusCircle className="mr-2" /> Add Teacher
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
            <Book className="mr-2" /> Manage Courses
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-yellow-600 rounded">
            <Users className="mr-2" /> Manage Teachers
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
            <Target className="mr-2" /> New Job
          </button>
          <button className="flex items-center p-2 bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-20 p-4">
        <header className="mb-4 flex ">
          <h1 className="text-3xl font-bold">Teachers</h1>
        </header>
       

        <div className="mt-6 grid grid-cols-3 gap-6">
          {teachers.map((teacher, index) => (
            <div key={index} className="border p-4 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
              <p className="text-sm mb-2"><strong>Subject:</strong> {teacher.subject}</p>
              <p className="text-sm mb-2"><strong>Experience:</strong> {teacher.experience}</p>
              <p className="text-sm mb-2"><strong>Email:</strong> {teacher.email}</p>
              <p className="text-sm mb-2"><strong>Phone:</strong> {teacher.phone}</p>
              <button
                className="mt-4 text-red-500 ml-6"
                onClick={() => handleRemoveTeacher(index)}
              >
                Remove Teacher
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
