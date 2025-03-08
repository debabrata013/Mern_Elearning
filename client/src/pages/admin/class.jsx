import React, { useState, useEffect } from 'react';
import { Plus, Trash, Eye, Save, RefreshCcw, Loader2, Zap } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import courseService from './api/courseService';



// Sampleteacher and category options (you can replace these with dynamic data)
const categories = ['Programming', 'Design', 'Business', 'Data Science', 'Marketing'];

const EnhancedLoader = ({ message = "Creating Course" }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-5 transform transition-all duration-300 ease-in-out">
        {/* Fixed the spinning issue */}
        <Loader2 className="text-blue-600 animate-spin-slow" size={50} strokeWidth={2} />
        <div className="flex items-center space-x-2">
          <span className="text-gray-800 text-lg font-semibold">{message}</span>
          <span className="text-blue-600 text-lg font-bold">{dots}</span>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full animate-[progress_1.5s_linear_infinite]"></div>
        </div>
      </div>

      <style>{`
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 2s linear infinite;
  }
`}</style>

    </div>
  );
};
const CourseManagementForm = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   


  const toggleContent = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    category: '',
    description: '',
    level: 'Beginner', // Default level
    coverImage: null,
    introVideo: null,
    syllabusPDF: null,
    startDate: '',
    endDate: '',
    duration: '',
    maxStudents: '',
    enrollmentDeadline: '',
    price: '', // Renamed from `courseFee`
    discount: '0',
    chapters: [{ title: '', description: '' }],
    language: 'English',
    currency: 'INR',
    prerequisites: [], // New field
    targetAudience: '', // New field
    learningOutcomes: [], // New field
    teacher: '', // New field (should be the instructor's ID)
    // New field
 
    tags: [] // New field
});




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
}, []); 

  const handleTeacherChange = (e) => {
    const selectedTeacher = teachers.find(teacher => teacher.userName === e.target.value);
    setFormData(prev => ({
      ...prev,
      instructor: selectedTeacher ? selectedTeacher._id : '',
      contactEmail: selectedTeacher ? selectedTeacher.email : ''
    }));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Debug log
    console.log(`Handling change for ${name}:`, value);

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? Number(value) : '') : value
    }));
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
    setFormData(prevFormData => ({
      ...prevFormData,
      chapters: prevFormData.chapters.filter((_, i) => i !== index),
    }));
  };
  

  // Reset form fields
  const handleReset = () => {
    setFormData({
      title: '',
      courseCode: '',
      category: '',
      description: '',
      level: 'Beginner',
      coverImage: null,
      introVideo: null,
      syllabusPDF: null,
      startDate: '',
      endDate: '',
      duration: '',
      maxStudents: '',
      enrollmentDeadline: '',
      price: '',
      discount: '0',
      chapters: [{ title: '', description: '' }],
      language: 'English',
      currency: 'INR',
      prerequisites: [],
      targetAudience: '',
      learningOutcomes: [],
      instructor: '',
      contactEmail: '',
      tags: []
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('courseCode', formData.courseCode);
    dataToSend.append('category', formData.category);
    dataToSend.append('description', formData.description);
    dataToSend.append('level', formData.level);
    dataToSend.append('startDate', formData.startDate);
    dataToSend.append('endDate', formData.endDate);
    dataToSend.append('duration', formData.duration);
    dataToSend.append('maxStudents', formData.maxStudents);
    dataToSend.append('enrollmentDeadline', formData.enrollmentDeadline);
    dataToSend.append('price', formData.price);
    dataToSend.append('discount', formData.discount);
    dataToSend.append('language', formData.language);
    dataToSend.append('currency', formData.currency);
    dataToSend.append('teacher', formData.teacher); // Use the instructor's ID
    dataToSend.append('contactEmail', formData.contactEmail);
    dataToSend.append('chapters', JSON.stringify(formData.chapters));
    dataToSend.append('prerequisites', JSON.stringify(formData.prerequisites));
    dataToSend.append('targetAudience', formData.targetAudience);
    dataToSend.append('learningOutcomes', JSON.stringify(formData.learningOutcomes));
    dataToSend.append('tags', JSON.stringify(formData.tags));
  
    if (formData.coverImage) {
      dataToSend.append('coverImage', formData.coverImage);
    }
    if (formData.introVideo) {
      dataToSend.append('introVideo', formData.introVideo);
    }
    if (formData.syllabusPDF) {
      dataToSend.append('syllabusPDF', formData.syllabusPDF);
    }
  
    try {
      const response = await courseService.createCourse(dataToSend);
      console.log('Course created successfully:', response);
      setError('Course created successfully!');
      handleReset();

      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating course:', error);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  
    
  // Assuming you have a function to handle the selection of a teacher
  

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

      {/* Error Message Display */}
      {error && (
        <div className={`
          p-4 rounded-lg mb-4 
          ${error.includes('successfully') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'}
        `}>
          {error}
        </div>
      )}

      {/* Enhanced Loader */}
      {loading && <EnhancedLoader />}

      {/* Disable form while loading */}
      <form 
  onSubmit={handleSubmit} 
  className={`bg-white p-8 rounded-lg shadow-lg space-y-8 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
>
  {/* 1. Course Details */}
  <section>
    <h3 className="text-2xl font-bold mb-6">Course Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div>
        <label htmlFor="level" className="block text-sm font-medium">Level</label>
        <select
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
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
          onChange={handleFileChange}
          accept="image/*"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="introVideo" className="block text-sm font-medium">Intro Video</label>
        <input
          type="file"
          id="introVideo"
          name="introVideo"
          onChange={handleFileChange}
          accept="video/*"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
    </div>
  </section>

  {/* 2. Schedule & Duration */}
  <section>
    <h3 className="text-2xl font-bold mb-6">Schedule & Duration</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <h3 className="text-2xl font-bold mb-6">Content Management</h3>
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
    <div className="mt-6">
      <h4 className="text-xl font-semibold mb-4">Add Chapters/Modules</h4>
      {formData.chapters.map((chapter, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start gap-4 mb-6 border p-4 rounded-md">
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
            className="text-red-600 self-end mt-2 md:mt-0"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addChapter}
        className="flex items-center text-blue-600 font-medium"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Chapter
      </button>
    </div>
  </section>

  {/* 4. Additional Information */}
  <section>
    <h3 className="text-2xl font-bold mb-6">Additional Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="prerequisites" className="block text-sm font-medium">Prerequisites</label>
        <input
          type="text"
          id="prerequisites"
          name="prerequisites"
          value={formData.prerequisites}
          onChange={handleChange}
          placeholder="Comma separated values"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium">Target Audience</label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          placeholder="e.g., Beginners, Professionals"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="learningOutcomes" className="block text-sm font-medium">Learning Outcomes</label>
        <input
          type="text"
          id="learningOutcomes"
          name="learningOutcomes"
          value={formData.learningOutcomes}
          onChange={handleChange}
          placeholder="Comma separated outcomes"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="syllabusPDF" className="block text-sm font-medium">Syllabus PDF</label>
        <input
          type="file"
          id="syllabusPDF"
          name="syllabusPDF"
          onChange={handleFileChange}
          accept="application/pdf"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Comma separated tags"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
    </div>
  </section>

  {/* 5. Teacher Details */}
  <section>
    <h3 className="text-2xl font-bold mb-6">Teacher Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <option key={index} value={teacher.email }>{teacher.userName}</option>
          ))}
        </select>
      </div>
      
    </div>
  </section>

  {/* 6. Enrollment Settings */}
  <section>
    <h3 className="text-2xl font-bold mb-6">Enrollment Settings</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

  {/* 7. Pricing */}
  <section>
    <h3 className="text-2xl font-bold mb-6">Pricing</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
      <label htmlFor="price" className="block text-sm font-medium">Course Fee</label>
<input
  type="number"
  id="price"
  name="price"
  value={formData.price}
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
  <section className="flex gap-6 mt-8">
    <button
      type="button"
      onClick={handleReset}
      className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 flex items-center"
    >
      <RefreshCcw className="h-5 w-5 mr-2" />
      Reset
    </button>
    <button 
      type="submit" 
      disabled={loading}
      className={`bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center ${loading ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
    >
      {loading ? 'Submitting...' : 'Create Course'}
    </button>
  </section>
</form>

      
    </div>)}
    </>
  );
};

export default CourseManagementForm;
