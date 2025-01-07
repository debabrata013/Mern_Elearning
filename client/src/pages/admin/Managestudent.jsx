import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { getAllStudents } from './api/apiServices';
import axiosInstance from '../../api/axiosInstance';

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handler function to fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      // API call will be implemented in another file
      // This is just the handler function
      
      const response = await getAllStudents();
    
      setStudents(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
 

  // Handler for viewing student details
  const handleViewStudent = (studentId) => {
    // View student logic will be implemented
    console.log('View student:', studentId);
  };

  // Handler for editing student
  const handleEditStudent = (studentId) => {
    const studentToEdit = students.find(student => student._id === studentId);
    if (!studentToEdit) {
      setError('Student not found');
      return;
    }

    const updatedUserName = prompt('Enter new user name:', studentToEdit.userName);
    const updatedEmail = prompt('Enter new email:', studentToEdit.email);
    const updatedPassword = prompt('Enter new password:', studentToEdit.password);

    if (updatedUserName && updatedEmail && updatedPassword) {
      const updatedStudent = {
        ...studentToEdit,
        userName: updatedUserName,
        email: updatedEmail,
        password: updatedPassword
      };

      axiosInstance.put(`/students/${studentId}`, updatedStudent)
        .then(response => {
          setStudents(students.map(student => student._id === studentId ? response.data : student));
          alert('Student updated successfully!');
        })
        .catch(error => {
          console.error('Error updating student:', error);
          setError('Failed to update student');
        });
    } else {
      setError('All fields are required to update the student');
    }
  };

  // Handler for deleting student
  const handleDeleteStudent = async (studentId) => {
    try {
     setLoading(true);
      const response = await axiosInstance.delete(`/students/${studentId}`);
      
      fetchStudents();
      setLoading(false);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Manage Students</h1>
          
          {/* Mobile view - Card layout */}
          <div className="block sm:hidden">
            {students.map((student) => (
              <div key={student._id} className="bg-white rounded-lg shadow mb-4 p-4">
                <div className="flex items-center mb-3">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={student.profileImage }
                    alt={student.userName}
                  />
                  <div className="ml-3">
                  
                    <div className="text-sm text-gray-500">{student.email}</div>
                 
                  </div>
                  
                </div>
                <div className="space-y-2">
                  
                  <div className="text-sm">
                    <span className="font-medium">Enrolled Courses:</span> {student.enrolledCourses?.length || 0}
                  </div>
                  <div className="text-sm">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-end space-x-3 mt-3">
                    <button onClick={() => handleViewStudent(student._id)} className="text-blue-600">
                      <FaEye className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleEditStudent(student._id)} className="text-yellow-600">
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteStudent(student._id)} className="text-red-600">
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view - Table layout */}
          <div className="hidden sm:block">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled Courses</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                          <img
                            className="h-full w-full rounded-full"
                            src={student.profileImage || 'https://via.placeholder.com/40'}
                            alt={student.name}
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.userName}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.email}</div>
                    </td>
                    
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.enrolledCourses?.length || 0}</div>
                    </td>
                   
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button onClick={() => handleViewStudent(student._id)} className="text-blue-600 hover:text-blue-900">
                          <FaEye className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleEditStudent(student._id)} className="text-yellow-600 hover:text-yellow-900">
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDeleteStudent(student._id)} className="text-red-600 hover:text-red-900">
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
