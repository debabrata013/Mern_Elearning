import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAllStudents } from './api/apiServices';
import axiosInstance from '../../api/axiosInstance';

const EditStudent = ({ student, onSave, onCancel }) => {
  const [userName, setUserName] = useState(student.userName);
  const [email, setEmail] = useState(student.email);
  const [password, setPassword] = useState(student.password);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    if (userName && email && password) {
      onSave({ ...student, userName, email, password });
    } else {
      alert('All fields are required!');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Student</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewStudent = ({ student, onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-lg font-bold mb-4">View Student</h2>
      <p><strong>Username:</strong> {student.userName}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Enrolled Courses:</strong> {student.enrolledCourses?.length || 0}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {student.isActive ? 'Active' : 'Inactive'}
        </span>
      </p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getAllStudents();
      setStudents(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStudent = async (updatedStudent) => {
    try {
      const response = await axiosInstance.put(
        `/students/${updatedStudent._id}`,
        updatedStudent
      );
      setStudents(
        students.map((student) =>
          student._id === updatedStudent._id ? response.data : student
        )
      );
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axiosInstance.delete(`/students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2  sm:px-4 py-4 sm:py-8">
      <div className="bg-white rounded-lg  w-full shadow">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Manage Students</h1>
          <div className="hidden sm:block">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.userName}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.email}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setViewingStudent(student)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setEditingStudent(student)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="block sm:hidden space-y-4">
            {students.map((student) => (
              <div key={student._id} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="font-bold">{student.userName}</p>
                <p>{student.email}</p>
                <div className="flex space-x-3 mt-2">
                  <button
                    onClick={() => setViewingStudent(student)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {editingStudent && (
        <EditStudent
          student={editingStudent}
          onSave={handleSaveStudent}
          onCancel={() => setEditingStudent(null)}
        />
      )}
      {viewingStudent && (
        <ViewStudent
          student={viewingStudent}
          onClose={() => setViewingStudent(null)}
        />
      )}
    </div>
  );
};

export default ManageStudent;
