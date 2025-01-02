import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { createTeacher } from './api/apiServices'; // Updated import path

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

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'profileImage' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (!formData.email) {
      console.error('Email is required');
      return;
    }

    try {
      await createTeacher(formDataToSend);
      // Reset form after successful creation
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
      setShowTeacherForm(false);
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowTeacherForm(!showTeacherForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {showTeacherForm ? 'Cancel' : 'Add Teacher'}
        </button>
      </div>

      {showTeacherForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Teacher</h3>
          <form onSubmit={handleAddTeacher}>
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
                  Teacher Profile Image
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
                <label className="block text-sm font-medium mb-1">Subject Knowledge</label>
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
                      className="w-full p-2 border rounded-lg"
                      placeholder={`Subject ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(index)}
                      className="ml-2 text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="text-blue-600"
                >
                  + Add Another Subject
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="salary">
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Teacher
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageTeachersContent;
