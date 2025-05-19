
import React, { useState, useEffect } from 'react';
import {
  FaEdit, FaTrash, FaEye, FaEyeSlash, FaUserGraduate, FaPlus, FaMinus
} from 'react-icons/fa';
import {
  getAllStudents,
  getAssignedCourses,
  getUnassignedCourses,
  assignCourseToStudent,
  removeCourseFromStudent
} from './api/apiServices';
// import axiosInstance from '../../api/axiosInstance';

const EditStudent = ({ student, onSave, onCancel }) => {
  const [userName, setUserName] = useState(student.userName);
  const [email, setEmail] = useState(student.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    if (!userName || !email) {
      return alert('Username and email are required!');
    }
    onSave({
      ...student,
      userName,
      email,
      password: password || undefined
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-[#5491CA] pb-2 border-b">Edit Student</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] transition-colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA] transition-colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
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
              aria-label="Toggle password visibility"
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

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [unassignedCourses, setUnassignedCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);

  // Fetch all students
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllStudents();
        setStudents(data);
      } catch {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveStudent = async (updatedStudent) => {
    try {
      const { data } = await axiosInstance.put(
        `/students/${updatedStudent._id}`,
        updatedStudent
      );
      setStudents((prev) => prev.map(s => s._id === data._id ? data : s));
      setEditingStudent(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axiosInstance.delete(`/students/${id}`);
      setStudents((prev) => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Load course lists when viewing a student
  useEffect(() => {
    if (!viewingStudent) return;
    const loadCourses = async () => {
      try {
        setCourseLoading(true);
        const [assigned, unassigned] = await Promise.all([
          getAssignedCourses(viewingStudent._id),
          getUnassignedCourses(viewingStudent._id)
        ]);
        setAssignedCourses(assigned);
        setUnassignedCourses(unassigned);
      } catch (err) {
        console.error(err);
      } finally {
        setCourseLoading(false);
      }
    };
    loadCourses();
  }, [viewingStudent]);

  const handleAddCourse = async (courseId) => {
    try {
      await assignCourseToStudent(viewingStudent._id, courseId);
      // Refresh courses
      const [assigned, unassigned] = await Promise.all([
        getAssignedCourses(viewingStudent._id),
        getUnassignedCourses(viewingStudent._id)
      ]);
      setAssignedCourses(assigned);
      setUnassignedCourses(unassigned);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      await removeCourseFromStudent(viewingStudent._id, courseId);
      const [assigned, unassigned] = await Promise.all([
        getAssignedCourses(viewingStudent._id),
        getUnassignedCourses(viewingStudent._id)
      ]);
      setAssignedCourses(assigned);
      setUnassignedCourses(unassigned);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = students.filter(s =>
    s.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

return (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-[#5491CA]">Manage Students</h1>

    <input
      type="text"
      placeholder="Search students..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5491CA] transition-colors"
    />

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-md shadow-md">
        <thead className="bg-[#5491CA] text-white">
          <tr>
            <th className="text-left py-2 px-2 sm:px-4">Username</th>
            <th className="text-left py-2 px-2 sm:px-4 hidden sm:table-cell">Email</th>
            <th className="text-left py-2 px-2 sm:px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((student) => (
            <tr key={student._id} className="border-t">
              <td className="py-2 px-2 sm:px-4">{student.userName}</td>
              <td className="py-2 px-2 sm:px-4 hidden sm:table-cell">{student.email}</td>
              <td className="py-2 px-2 sm:px-4 space-x-2 whitespace-nowrap">
                <button onClick={() => setEditingStudent(student)} className="text-yellow-600 hover:text-yellow-800" aria-label="Edit student">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteStudent(student._id)} className="text-red-600 hover:text-red-800" aria-label="Delete student">
                  <FaTrash />
                </button>
                <button onClick={() => setViewingStudent(student)} className="text-blue-600 hover:text-blue-800" aria-label="View student courses">
                  <FaUserGraduate />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {editingStudent && (
      <EditStudent
        student={editingStudent}
        onSave={handleSaveStudent}
        onCancel={() => setEditingStudent(null)}
      />
    )}

    {viewingStudent && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xl sm:max-w-3xl border border-gray-200 max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#5491CA] pb-2 border-b">
            Manage Courses for {viewingStudent.userName}
          </h2>
          {courseLoading ? (
            <p>Loading courses...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-md sm:text-lg text-gray-700 mb-2">Assigned Courses</h3>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {assignedCourses.map(course => (
                    <li key={course._id} className="flex justify-between items-center border rounded px-3 py-2">
                      <span className="truncate max-w-[70%]">{course.title}</span>
                      <button
                        onClick={() => handleRemoveCourse(course._id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Remove ${course.title}`}
                      >
                        <FaMinus />
                      </button>
                    </li>
                  ))}
                  {assignedCourses.length === 0 && <p className="text-sm text-gray-500">No courses assigned</p>}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-md sm:text-lg text-gray-700 mb-2">Unassigned Courses</h3>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {unassignedCourses.map(course => (
                    <li key={course._id} className="flex justify-between items-center border rounded px-3 py-2">
                      <span className="truncate max-w-[70%]">{course.title}</span>
                      <button
                        onClick={() => handleAddCourse(course._id)}
                        className="text-green-600 hover:text-green-800"
                        aria-label={`Add ${course.title}`}
                      >
                        <FaPlus />
                      </button>
                    </li>
                  ))}
                  {unassignedCourses.length === 0 && <p className="text-sm text-gray-500">All courses assigned</p>}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-4 text-right">
            <button
              onClick={() => setViewingStudent(null)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default ManageStudent;

