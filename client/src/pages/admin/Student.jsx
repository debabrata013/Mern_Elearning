import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { createStudent } from './api/apiServices'; // Updated import path

const ManageStudentsContent = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'student', 
    profileImage:'',
    purchasedCourses: [], 
  });

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

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'profileImage' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await createStudent(formDataToSend);
      // Reset form after successful creation
      setFormData({
        userName: '',
        email: '',
        password: '',
        role: 'student',
        profileImage: null,
        purchasedCourses: [],
      });
      setShowStudentForm(false);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowStudentForm(!showStudentForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {showStudentForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showStudentForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New User</h3>
          <form onSubmit={handleAddStudent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="userName">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="profileImage">
                  Student Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={(e) => handleFileChange(e, 'profileImage')}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="purchasedCourses">
                  Purchased Courses
                </label>
                <input
                  type="text"
                  id="purchasedCourses"
                  name="purchasedCourses"
                  value={formData.purchasedCourses.join(', ')}
                  onChange={(e) => setFormData({ ...formData, purchasedCourses: e.target.value.split(', ') })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit User
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageStudentsContent;
