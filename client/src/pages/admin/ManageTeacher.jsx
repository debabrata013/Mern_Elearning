import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { getAllTeachers, deleteTeacher } from './api/apiServices'; // Import the API calls

const ManageTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handler function to fetch teachers
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await getAllTeachers();
      console.log("response", response);
      setTeachers(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handler for viewing teacher details
  const handleViewTeacher = (teacherId) => {
    console.log('View teacher:', teacherId);
  };

  // Handler for editing teacher
  const handleEditTeacher = (teacherId) => {
    console.log('Edit teacher:', teacherId);
  };

  // Handler for deleting teacher
  const handleDeleteTeacher = async (teacherId) => {
    try {
      await deleteTeacher(teacherId);
      setTeachers(teachers.filter(teacher => teacher._id !== teacherId));
    } catch (error) {
      console.error('Error deleting teacher:', error);
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
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Manage Teachers</h1>
          
          {/* Mobile view - Card layout */}
          <div className="block sm:hidden">
            {teachers.map((teacher) => (
              <div key={teacher._id} className="bg-white rounded-lg shadow mb-4 p-4">
                <div className="flex items-center mb-3">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={teacher.teacherProfileImage || 'https://via.placeholder.com/40'}
                    alt={teacher.teacherName}
                  />
                  <div className="ml-3">
                    <div className="font-medium">{teacher.teacherName}</div>
                    <div className="text-sm text-gray-500">{teacher.email}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Subjects:</span> {teacher.subjectKnowledge.join(', ')}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Salary:</span> ${teacher.salary}
                  </div>
                  <div className="flex justify-end space-x-3 mt-3">
                    <button onClick={() => handleViewTeacher(teacher._id)} className="text-blue-600">
                      <FaEye className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleEditTeacher(teacher._id)} className="text-yellow-600">
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteTeacher(teacher._id)} className="text-red-600">
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
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                          <img
                            className="h-full w-full rounded-full"
                            src={teacher.teacherProfileImage || 'https://via.placeholder.com/40'}
                            alt={teacher.teacherName}
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-medium text-gray-900">{teacher.teacherName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.email}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.subjectKnowledge.join(', ')}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${teacher.salary}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button onClick={() => handleViewTeacher(teacher._id)} className="text-blue-600 hover:text-blue-900">
                          <FaEye className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleEditTeacher(teacher._id)} className="text-yellow-600 hover:text-yellow-900">
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDeleteTeacher(teacher._id)} className="text-red-600 hover:text-red-900">
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

export default ManageTeacher;
