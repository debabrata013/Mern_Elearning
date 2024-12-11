import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const ManageStudentsContent = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    profileImage: null, // Change to store file instead of URL
    name: '',
    email: '',
    mobile: '',
    age: '',
    coursesEnrolled: [''], // Initializing with an empty string array to represent courses
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseChange = (e, index) => {
    const newCourses = [...formData.coursesEnrolled];
    newCourses[index] = e.target.value;
    setFormData({ ...formData, coursesEnrolled: newCourses });
  };

  const handleAddCourse = () => {
    setFormData({
      ...formData,
      coursesEnrolled: [...formData.coursesEnrolled, ''],
    });
  };

  const handleRemoveCourse = (index) => {
    const newCourses = formData.coursesEnrolled.filter((_, i) => i !== index);
    setFormData({ ...formData, coursesEnrolled: newCourses });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleContent = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    setStudents((prevStudents) => [
      ...prevStudents,
      { ...formData, id: Date.now() },
    ]);
    setFormData({
      profileImage: null,
      name: '',
      email: '',
      mobile: '',
      age: '',
      coursesEnrolled: [''], // Reset courses to an empty array after adding the student
    });
    setShowStudentForm(false);
  };

  const handleRemoveStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  const handleModifyStudentDetails = (id, newDetails) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, ...newDetails } : student
      )
    );
  };

  const renderStudentCard = (student) => (
    <div key={student.id} className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={student.profileImage ? URL.createObjectURL(student.profileImage) : '/api/placeholder/300/200'}
        alt={student.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{student.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{student.email}</p>
        <p className="text-sm text-gray-600 mb-2">{student.mobile}</p>
        <p className="text-sm text-gray-600 mb-2">Age: {student.age}</p>
        <p className="text-sm text-gray-600 mb-2">Courses Enrolled: {student.coursesEnrolled.join(', ')}</p>
        <button
          onClick={() => {
            const newDetails = prompt("Enter new student details (name, email, mobile, etc.)", `${student.name}, ${student.email}`);
            if (newDetails) {
              const [name, email, mobile] = newDetails.split(',').map(item => item.trim());
              handleModifyStudentDetails(student.id, { name, email, mobile });
            }
          }}
          className="mt-2 text-blue-600 hover:text-blue-700"
        >
          Modify Details
        </button>
        <button
          onClick={() => handleRemoveStudent(student.id)}
          className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Remove Student
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {/* Add Student Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleContent}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {isVisible ? 'Cancel' : 'Add'}
        </button>
      </div>

      {/* Student Form (visible when showStudentForm is true) */}
      {isVisible && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
          <form onSubmit={handleAddStudent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="profileImage">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleProfileImageChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Student Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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
                <label className="block text-sm font-medium mb-1" htmlFor="mobile">
                  Mobile No
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="age">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {/* Dynamic Courses Enrolled */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Courses Enrolled</label>
                {formData.coursesEnrolled.map((course, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => handleCourseChange(e, index)}
                      className="w-full p-2 border rounded-lg"
                      placeholder={`Course ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(index)}
                      className="ml-2 text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="text-blue-600"
                >
                  + Add Another Course
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Student
            </button>
          </form>
        </div>
      )}

      {/* Display Students as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No students available. Add some students!</p>
        ) : (
          students.map(renderStudentCard)
        )}
      </div>
    </div>
  );
};

export default ManageStudentsContent;
