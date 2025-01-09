import React, { useState, useEffect } from 'react';
import { Plus, Trash, Eye, Save, RefreshCcw } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

// Sampleteacher and category options (you can replace these with dynamic data)
const categories = ['Programming', 'Design', 'Business', 'Data Science', 'Marketing'];

const CourseManagementForm = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  

  const toggleContent = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const [formData, setFormData] = useState({
    title: '',
    coverImage:"",
    introVideo:"",
 
    courseCode: '',
    category: '',
    description: '',
    
    startDate: '',
    endDate: '',
    duration: '',
    syllabusPDF:"",
    chapters: [{ title: '', description: '' }],
   teacher: '',
    contact: '',
    maxStudents: '',
    enrollmentDeadline: '',
    courseFee: '',
    discount: '',
 
  });

  const [savedCourses, setSavedCourses] = useState([]); // To store saved drafts

  const [teachers, setteachers] = useState([]); // State to holdteacher data
  const [teacher, setTeacher] = useState([]);

  // Fetchteachers from the backend
  useEffect(() => {
    const fetchteachers = async () => {
      try {
        const response = await axiosInstance.get('/teachers'); // Replace with your API endpoint
        console.log(response);
        const data =  response.data;
        setteachers(data.map(teacher => teacher

       
        
        )); // Extracting userName from each teacher object

      } catch (error) {
        console.error('Error fetchingteachers:', error);
      }
    };

    fetchteachers();
  }, []); // Empty dependency array to run once on component mount

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle chapters (add/remove chapters)
  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[index][name] = value;
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { title: '', description: '' }],
    });
  };

  const removeChapter = (index) => {
    const updatedChapters = formData.chapters.filter((_, i) => i !== index);
    setFormData({ ...formData, chapters: updatedChapters });
  };

  // Reset form fields
  const handleReset = () => {
    setFormData({
      title: '',
      courseCode: '',
      category: '',
      description: '',
      startDate: '',
      endDate: '',
      duration: '',
      material: null,
      chapters: [{ title: '', description: '' }],
     teacher: '',
      contact: '',
      maxStudents: '',
      enrollmentDeadline: '',
      courseFee: '',
    
    });
    setPreviewMode(false); // Reset preview mode
  };

  // Save course as a draft
  const handleSaveDraft = () => {
    setSavedCourses([...savedCourses, formData]);
    handleReset();
  };

 
  // Submit the form (this can be connected to an API or state management)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Data Submitted:', formData);
    // Handle actual submission logic here
  };

  // Assuming you have a function to handle the selection of a teacher
  const handleTeacherSelect = (selectedTeacher) => {
    setTeacher(selectedTeacher); // Update the teacher state with the selected teacher's details
  };

  return (
    <>
     <button
        onClick={toggleContent}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {isVisible ? 'Hide Content' : 'Show Content'}
      </button>
      {isVisible && (
    <div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* 1. Course Details */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="courseCode" className="block text-sm font-medium">Course Code</label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                rows="4"
                required
              />
            </div>
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium">Cover Image</label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor="introVideo" className="block text-sm font-medium">Intro Video</label>
              <input
                type="file"
                id="introVideo"
                name="introVideo"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
          </div>
        </section>

        {/* 2. Schedule & Duration */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Schedule & Duration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium">Duration (Weeks)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
          </div>
        </section>

        {/* 3. Content Management */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Content Management</h3>
          <div>
            <label htmlFor="material" className="block text-sm font-medium">Upload Course Material</label>
            <input
              type="file"
              id="material"
              name="material"
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mt-4">
            <h4 className="font-medium">Add Chapters/Modules</h4>
            {formData.chapters.map((chapter, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <div className="w-full">
                  <label className="block text-sm font-medium">Chapter Title</label>
                  <input
                    type="text"
                    name="title"
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(index, e)}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium">Chapter Description</label>
                  <textarea
                    name="description"
                    value={chapter.description}
                    onChange={(e) => handleChapterChange(index, e)}
                    className="mt-1 p-2 border rounded-md w-full"
                    rows="2"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeChapter(index)}
                  className="text-red-600"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addChapter}
              className="flex items-center text-blue-600"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Chapter
            </button>
          </div>
        </section>

        {/* 4. Teacher Details */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Teacher Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teacher" className="block text-sm font-medium">Teacher Name</label>
              <select
                id="teacher"
                name="teacher"
                value={teacher.userName}
                onChange={(e) => {
                  handleChange(e);
                  const selectedTeacher = teachers.find(t => t.userName === e.target.value);
                  setTeacher(selectedTeacher || {});
                }}
                className="mt-1 p-2 border rounded-md w-full"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher.userName}>{teacher.userName}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium">Instructor Contact</label>
              <p className="mt-1 p-2 border rounded-md w-full bg-gray-100">
                {teacher.email || 'No email available'}
              </p>
            </div>
          </div>
        </section>

        {/* 5. Enrollment Settings */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Enrollment Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="maxStudents" className="block text-sm font-medium">Max Students Allowed</label>
              <input
                type="number"
                id="maxStudents"
                name="maxStudents"
                value={formData.maxStudents}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="enrollmentDeadline" className="block text-sm font-medium">Enrollment Deadline</label>
              <input
                type="date"
                id="enrollmentDeadline"
                name="enrollmentDeadline"
                value={formData.enrollmentDeadline}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
          </div>
        </section>

        {/* 6. Pricing */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="courseFee" className="block text-sm font-medium">Course Fee</label>
              <input
                type="number"
                id="courseFee"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="discount" className="block text-sm font-medium">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
          </div>
        </section>

       

        {/* Buttons */}
        <section className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            <RefreshCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
          
          
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </section>
      </form>

      
    </div>)}
    </>
  );
};

export default CourseManagementForm;
