import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaUserGraduate } from 'react-icons/fa';
import { getAllStudents } from './api/apiServices';
import axiosInstance from '../../api/axiosInstance';

const EditStudent = ({ student, onSave, onCancel }) => {
  const [userName, setUserName] = useState(student.userName);
  const [email, setEmail] = useState(student.email);
  const [password, setPassword] = useState(student.password || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    if (userName && email) {
      onSave({
        ...student,
        userName,
        email,
        password: password || student.password
      });
    } else {
      alert('Username and email are required!');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-[#5491CA] pb-2 border-b">Edit Student</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] transition-colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] transition-colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash className="text-[#b1a9f1]" /> : <FaEye className="text-[#b1a9f1]" />}
            </button>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#5491CA] text-white rounded-md hover:bg-[#4a82b6] transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewStudent = ({ student, onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="bg-[#5491CA] p-3 rounded-full mr-3">
          <FaUserGraduate className="text-white text-xl" />
        </div>
        <h2 className="text-xl font-bold text-[#5491CA]">Student Details</h2>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Username</p>
          <p className="font-medium">{student.userName}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{student.email}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Enrolled Courses</p>
          <p className="font-medium">{student.enrolledCourses?.length || 0}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Status</p>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full inline-block mt-1 ${
            student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {student.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#5491CA] text-white rounded-md hover:bg-[#4a82b6] transition-colors shadow-sm"
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
  const [searchTerm, setSearchTerm] = useState('');

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
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      try {
        await axiosInstance.delete(`/students/${studentId}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5491CA]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 bg-red-50 p-4 rounded-md border border-red-200">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 max-w-full">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold text-[#5491CA] mb-4 sm:mb-0">Manage Students</h1>
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA]"
              />
            </div>
          </div>
          
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <FaUserGraduate className="mx-auto text-[#b1a9f1] text-4xl mb-3" />
              <p className="text-gray-500">No students found</p>
            </div>
          ) : (
            <>
              {/* Desktop view */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-[#5491CA] text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-md">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tr-md">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => setViewingStudent(student)}
                              className="text-[#5491CA] hover:text-[#4a82b6] transition-colors p-1 rounded-full hover:bg-blue-50"
                              title="View Student"
                            >
                              <FaEye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setEditingStudent(student)}
                              className="text-[#b1a9f1] hover:text-[#9f97e8] transition-colors p-1 rounded-full hover:bg-purple-50"
                              title="Edit Student"
                            >
                              <FaEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student._id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                              title="Delete Student"
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
              
              {/* Mobile view */}
              <div className="block sm:hidden space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border-l-4 border-[#5491CA]">
                    <p className="font-bold text-[#5491CA]">{student.userName}</p>
                    <p className="text-gray-600 text-sm mb-3">{student.email}</p>
                    <div className="flex space-x-4 mt-2 justify-end">
                      <button
                        onClick={() => setViewingStudent(student)}
                        className="text-[#5491CA] hover:text-[#4a82b6] transition-colors"
                        aria-label="View student"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="text-[#b1a9f1] hover:text-[#9f97e8] transition-colors"
                        aria-label="Edit student"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete student"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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
