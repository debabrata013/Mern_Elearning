import React, { useState } from 'react';
import { Plus, User, Mail, Lock, X, Loader } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

const ManageStudentsContent = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'userName':
        setUserName(value);
        break;
      default:
        break;
    }
  };

  // Validate required fields
  const validateForm = () => {
    if (!userName || !email || !password) {
      setError('All fields are required!');
      return false;
    }
    return true;
  };

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      email,
      password,
      userName,
      role: 'student'
    };

    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.post('/students/', userData);
      console.log(response);
      
      // Show success message
      setSuccess('Student added successfully!');
      
      // Reset form
      setEmail("");
      setPassword("");
      setUserName("");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
        setShowStudentForm(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error creating student:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5491CA]">Manage Students</h2>
        <button
          onClick={() => {
            setShowStudentForm(!showStudentForm);
            setError("");
            setSuccess("");
          }}
          className={`${
            showStudentForm 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
              : 'bg-[#5491CA] text-white hover:bg-[#4a82b6]'
          } px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm`}
        >
          {showStudentForm ? (
            <>
              <X className="h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add User
            </>
          )}
        </button>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md flex items-center">
          <div className="bg-green-100 p-1 rounded-full mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          {success}
        </div>
      )}

      {showStudentForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-[#5491CA] border-b pb-3">Add New User</h3>
          <form onSubmit={handleAddStudent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="userName">
                  User Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] outline-none"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] outline-none"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 sm:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md border-l-4 border-red-500">
                {error}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setShowStudentForm(false)}
                className="mr-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#5491CA] text-white rounded-lg hover:bg-[#4a82b6] transition-colors disabled:bg-[#5491CA]/50 flex items-center"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Submit User'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Student list would go here */}
      {!showStudentForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="text-center py-8 text-gray-500">
            <User className="h-12 w-12 mx-auto text-[#b1a9f1] mb-3" />
            <p>Student list will appear here</p>
            <p className="text-sm mt-2">Click "Add User" to create a new student account</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudentsContent;