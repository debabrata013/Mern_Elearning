import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const ManageTeachersContent = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    profileImage: '',
    name: '',
    email: '',
    mobile: '',
    age: '',
    subjectKnowledge: '',
    salary: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    setTeachers((prevTeachers) => [...prevTeachers, { ...formData, id: Date.now() }]);
    setFormData({
      profileImage: '',
      name: '',
      email: '',
      mobile: '',
      age: '',
      subjectKnowledge: '',
      salary: '',
    });
    setShowTeacherForm(false);
  };

  const handleRemoveTeacher = (id) => {
    setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== id));
  };

  const handleModifySalary = (id, newSalary) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === id ? { ...teacher, salary: newSalary } : teacher
      )
    );
  };

  const renderTeacherCard = (teacher) => (
    <div key={teacher.id} className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={teacher.profileImage || '/api/placeholder/300/200'}
        alt={teacher.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{teacher.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{teacher.email}</p>
        <p className="text-sm text-gray-600 mb-2">{teacher.mobile}</p>
        <p className="text-sm text-gray-600 mb-2">Age: {teacher.age}</p>
        <p className="text-sm text-gray-600 mb-2">Subject Knowledge: {teacher.subjectKnowledge}</p>
        <p className="text-sm text-gray-500">Salary: ${teacher.salary}</p>
        <button
          onClick={() => handleModifySalary(teacher.id, prompt("Enter new salary", teacher.salary))}
          className="mt-2 text-blue-600 hover:text-blue-700"
        >
          Modify Salary
        </button>
        <button
          onClick={() => handleRemoveTeacher(teacher.id)}
          className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Remove Teacher
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {/* Add Teacher Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowTeacherForm(!showTeacherForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Teacher
        </button>
      </div>

      {/* Teacher Form (visible when showTeacherForm is true) */}
      {showTeacherForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Teacher</h3>
          <form onSubmit={handleAddTeacher}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="profileImage">Profile Image URL</label>
                <input
                  type="url"
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">Teacher Name</label>
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
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
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
                <label className="block text-sm font-medium mb-1" htmlFor="mobile">Mobile No</label>
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
                <label className="block text-sm font-medium mb-1" htmlFor="age">Age</label>
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="subjectKnowledge">Subject Knowledge</label>
                <input
                  type="text"
                  id="subjectKnowledge"
                  name="subjectKnowledge"
                  value={formData.subjectKnowledge}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="salary">Salary</label>
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

      {/* Display Teachers as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No teachers available. Add some teachers!</p>
        ) : (
          teachers.map(renderTeacherCard)
        )}
      </div>

      {/* Demo Teachers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Demo Teacher 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src="/api/placeholder/300/200" alt="Demo Teacher" className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-gray-600 mb-2">john.doe@example.com</p>
            <p className="text-sm text-gray-600 mb-2">Mobile: 123-456-7890</p>
            <p className="text-sm text-gray-600 mb-2">Age: 35</p>
            <p className="text-sm text-gray-600 mb-2">Subject Knowledge: Mathematics</p>
            <p className="text-sm text-gray-500">Salary: $50,000</p>
          </div>
        </div>
        {/* Demo Teacher 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src="/api/placeholder/300/200" alt="Demo Teacher" className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Jane Smith</h3>
            <p className="text-sm text-gray-600 mb-2">jane.smith@example.com</p>
            <p className="text-sm text-gray-600 mb-2">Mobile: 987-654-3210</p>
            <p className="text-sm text-gray-600 mb-2">Age: 28</p>
            <p className="text-sm text-gray-600 mb-2">Subject Knowledge: English</p>
            <p className="text-sm text-gray-500">Salary: $45,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeachersContent;
