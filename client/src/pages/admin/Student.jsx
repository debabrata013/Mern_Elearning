import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

const ManageStudentsContent = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await axiosInstance.post('/students/', userData);
      console.log(response);
      setShowStudentForm(false);
      alert('Student added successfully!');
      
      // Reset form
      setEmail("");
      setPassword("");
      setUserName("");
      setError("");
    } catch (error) {
      console.error('Error creating student:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
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
                  value={userName}
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
                  value={email}
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
                  value={password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            {error && <div className="mb-4 text-red-500">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Adding...' : 'Submit User'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageStudentsContent;