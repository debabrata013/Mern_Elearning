import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const ManageTeachersContent = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    profileImage: '',
    decription:"",
    name: '',
    email: '',
    mobile: '',
    age: '',
    subjectKnowledge: [''], // Changed to an array to handle multiple subjects
    salary: '',
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'subjectKnowledge') {
      // If the subject knowledge field is updated, handle it dynamically
      const updatedSubjects = [...formData.subjectKnowledge];
      updatedSubjects[index] = value;
      setFormData({ ...formData, subjectKnowledge: updatedSubjects });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjectKnowledge: [...formData.subjectKnowledge, ''], // Add a new empty subject field
    });
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = formData.subjectKnowledge.filter((_, i) => i !== index);
    setFormData({ ...formData, subjectKnowledge: updatedSubjects });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file, // Store the image file
      }));
    }
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
      subjectKnowledge: [''], // Reset to default single empty subject knowledge
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
        src={teacher.profileImage ? URL.createObjectURL(teacher.profileImage) : '/api/placeholder/300/200'}
        alt={teacher.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{teacher.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{teacher.email}</p>
        <p className="text-sm text-gray-600 mb-2">{teacher.mobile}</p>
        <p className="text-sm text-gray-600 mb-2">Age: {teacher.age}</p>
        <div className="text-sm text-gray-600 mb-2">
          Subject Knowledge: {teacher.subjectKnowledge.join(', ')}
        </div>
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
                <label className="block text-sm font-medium mb-1" htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleProfileImageChange}
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
                <label className="block text-sm font-medium mb-1" htmlFor="decription">Decription</label>
                <input
                  type="text"
                  id="decription"
                  name="decription"
                  value={formData.decription}
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

              {/* Render subject knowledge inputs dynamically */}
              {formData.subjectKnowledge.map((subject, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor={`subjectKnowledge-${index}`}>Subject Knowledge {index + 1}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      id={`subjectKnowledge-${index}`}
                      name="subjectKnowledge"
                      value={subject}
                      onChange={(e) => handleInputChange(e, index)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddSubject}
                className="bg-green-600 text-white py-2 w-32 rounded-lg hover:bg-green-700"
              >
                Add Subject
              </button>

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
    </div>
  );
};

export default ManageTeachersContent;
