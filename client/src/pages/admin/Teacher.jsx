import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { createTeacher } from './api/apiServices'; // Updated import path
import axiosInstance from '../../api/axiosInstance';

const ManageTeachersContent = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'teacher',
    description: '',
    profileImage: null,
    subjectKnowledge: [''],
    salary: '',
    mobile:''
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: file,
      }));
    }
  };

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjectKnowledge: [...formData.subjectKnowledge, ''],
    });
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = formData.subjectKnowledge.filter((_, i) => i !== index);
    setFormData({ ...formData, subjectKnowledge: newSubjects });
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.userName || !formData.email || !formData.password) {
      setError('Required fields cannot be empty');
      return;
    }

    const userData = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      role: 'teacher',
      description: formData.description,
      subjectKnowledge: formData.subjectKnowledge.filter(subject => subject.trim() !== ''),
      salary: formData.salary
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post('/teachers/', userData);
      console.log(response);
      setShowTeacherForm(false);
      alert('Teacher added successfully!');
      
      // Reset form
      setFormData({
        userName: '',
        email: '',
        password: '',
        role: 'teacher',
        description: '',
        profileImage: null,
        subjectKnowledge: [''],
        salary: '',
      });
      setError("");
    } catch (error) {
      console.error('Error creating teacher:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-50 p-6 rounded-xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowTeacherForm(!showTeacherForm)}
          className="bg-[#7670AC] text-white px-4 py-2 rounded-lg hover:bg-[#665d9c] flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {showTeacherForm ? 'Cancel' : 'Add Teacher'}
        </button>
      </div>

      {showTeacherForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-[#e9e7f5]">
          <h3 className="text-xl font-semibold mb-4 text-[#7670AC]">Add New Teacher</h3>
          {error && <div className="mb-4 p-2 bg-red-50 text-red-600 rounded-lg">{error}</div>}
          <form onSubmit={handleAddTeacher}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[#5491CA]" htmlFor="userName">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d4d0e8] rounded-lg focus:ring-2 focus:ring-[#7670AC] focus:border-[#7670AC] outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[#5491CA]" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d4d0e8] rounded-lg focus:ring-2 focus:ring-[#7670AC] focus:border-[#7670AC] outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[#5491CA]" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d4d0e8] rounded-lg focus:ring-2 focus:ring-[#7670AC] focus:border-[#7670AC] outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[#5491CA]" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d4d0e8] rounded-lg focus:ring-2 focus:ring-[#7670AC] focus:border-[#7670AC] outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[#5491CA]">Subject Knowledge</label>
                {formData.subjectKnowledge.map((subject, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        const newSubjects = [...formData.subjectKnowledge];
                        newSubjects[index] = e.target.value;
                        setFormData({ ...formData, subjectKnowledge: newSubjects });
                      }}
                      className="w-full p-2 border border-[#d4d0e8] rounded-lg focus:ring-2 focus:ring-[#7670AC] focus:border-[#7670AC] outline-none"
                      placeholder={`Subject ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(index)}
                      className="ml-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="text-[#5491CA] hover:text-[#3a77b0] font-medium flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3 w-3" /> Add Another Subject
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[#5491CA]" htmlFor="salary">
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d4d0e8] rounded-lg focus:ring-2 focus:ring-[#7670AC] focus:border-[#7670AC] outline-none"
                  required
                />
              </div>
              <div className="mb-4 sm:col-span-2">
                <label className="block text-sm font-medium mb-1 text-[#5491CA]" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d4d0e8] rounded-lg focus:ring-2 focus:ring-[#7670AC] focus:border-[#7670AC] outline-none min-h-[100px]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7670AC] to-[#5491CA] text-white py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Submit Teacher'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageTeachersContent;
