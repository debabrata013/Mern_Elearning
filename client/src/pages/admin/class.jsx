import React, { useState, useEffect } from 'react';
import { Plus, Trash, Eye, Save, RefreshCcw, Loader2, Zap } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import courseService from './api/courseService';

// Category options
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
        <Loader2 className="text-[#5491CA] animate-spin-slow" size={50} strokeWidth={2} />
        <div className="flex items-center space-x-2">
          <span className="text-gray-800 text-lg font-semibold">{message}</span>
          <span className="text-[#5491CA] text-lg font-bold">{dots}</span>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
          <div className="bg-[#5491CA] h-full animate-[progress_1.5s_linear_infinite]"></div>
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
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
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
    teacher: '',
    tags: []
  });

  const [teachers, setteachers] = useState([]);
  const [teacher, setTeacher] = useState([]);

  // Fetch teachers from the backend
  useEffect(() => {
    const fetchteachers = async () => {
      try {
        const response = await axiosInstance.get('/teachers');
        console.log(response);
        const data = response.data;
        setteachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
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
    dataToSend.append('teacher', formData.teacher);
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
    } catch (error) {
      console.error('Error creating course:', error);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleContent}
        className="bg-[#5491CA] text-white px-6 py-3 rounded-lg hover:bg-[#4a82b6] transition-colors shadow-md mb-6 flex items-center"
      >
        {isVisible ? (
          <>
            <Eye className="mr-2 h-5 w-5" />
            Hide Form
          </>
        ) : (
          <>
            <Plus className="mr-2 h-5 w-5" />
            Create New Course
          </>
        )}
      </button>
      
      {isVisible && (
        <div className="bg-gray-50 rounded-xl shadow-md">
          {/* Error Message Display */}
          {error && (
            <div className={`
              p-4 rounded-lg mb-6 shadow-sm
              ${error.includes('successfully') 
                ? 'bg-green-100 text-green-800 border-l-4 border-green-500' 
                : 'bg-red-100 text-red-800 border-l-4 border-red-500'}
            `}>
              {error}
            </div>
          )}

          {/* Enhanced Loader */}
          {loading && <EnhancedLoader />}

          {/* Course Form */}
          <form 
            onSubmit={handleSubmit} 
            className={`bg-white p-4 rounded-lg shadow-lg space-y-8 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {/* 1. Course Details */}
            <section className="border-b pb-6">
  <h3 className="text-2xl font-bold mb-6 text-[#5491CA]">Course Details</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Course Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
        required
      />
    </div>

    <div>
      <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">
        Course Code
      </label>
      <input
        type="text"
        id="courseCode"
        name="courseCode"
        value={formData.courseCode}
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
        required
      />
    </div>

    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
        required
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="level" className="block text-sm font-medium text-gray-700">
        Level
      </label>
      <select
        id="level"
        name="level"
        value={formData.level}
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
        required
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>

    <div className="sm:col-span-2">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
        rows="4"
        required
      />
    </div>

    <div>
      <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
        Cover Image
      </label>
      <input
        type="file"
        id="coverImage"
        name="coverImage"
        onChange={handleFileChange}
        accept="image/*"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
      />
    </div>

    <div>
      <label htmlFor="introVideo" className="block text-sm font-medium text-gray-700">
        Intro Video
      </label>
      <input
        type="file"
        id="introVideo"
        name="introVideo"
        onChange={handleFileChange}
        accept="video/*"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
      />
    </div>
  </div>
</section>


            {/* 2. Schedule & Duration */}
            <section className="border-b pb-6">
              <h3 className="text-2xl font-bold mb-6 text-[#5491CA]">Schedule & Duration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (Weeks)</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                    required
                  />
                </div>
              </div>
            </section>

            {/* 3. Content Management */}
            <section className="border-b pb-6">
              <h3 className="text-2xl font-bold mb-6 text-[#5491CA]">Content Management</h3>
              <div>
                <label htmlFor="material" className="block text-sm font-medium text-gray-700">Upload Course Material</label>
                <input
                  type="file"
                  id="material"
                  name="material"
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                />
              </div>
              <div className="mt-6">
  <h4 className="text-xl font-semibold mb-4 text-[#b1a9f1]">Add Chapters/Modules</h4>
  {formData.chapters.map((chapter, index) => (
    <div
      key={index}
      className="flex flex-col md:flex-row items-start gap-4 mb-6 border border-gray-200 p-4 rounded-md bg-gray-50 hover:shadow-sm transition-shadow"
    >
      <div className="w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700">Chapter Title</label>
        <input
          type="text"
          name="title"
          value={chapter.title}
          onChange={(e) => handleChapterChange(index, e)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
          required
        />
      </div>
      <div className="w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700">Chapter Description</label>
        <textarea
          name="description"
          value={chapter.description}
          onChange={(e) => handleChapterChange(index, e)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
          rows="2"
          required
        />
      </div>
      <button
        type="button"
        onClick={() => removeChapter(index)}
        className="text-[#b1a9f1] hover:text-[#9f97e8] self-end mt-2 md:mt-0 p-2 rounded-full hover:bg-gray-100"
        aria-label={`Remove chapter ${index + 1}`}
      >
        <Trash className="h-5 w-5" />
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addChapter}
    className="flex items-center text-[#5491CA] font-medium hover:text-[#4a82b6] bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
  >
    <Plus className="h-5 w-5 mr-2" />
    Add Chapter
  </button>
</div>

            </section>

            {/* 4. Additional Information */}
            <section className="border-b pb-6">
              <h3 className="text-2xl font-bold mb-6 text-[#5491CA]">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">Prerequisites</label>
                  <input
                    type="text"
                    id="prerequisites"
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleChange}
                    placeholder="Comma separated values"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                  />
                </div>
                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">Target Audience</label>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    placeholder="e.g., Beginners, Professionals"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="learningOutcomes" className="block text-sm font-medium text-gray-700">Learning Outcomes</label>
                  <input
                    type="text"
                    id="learningOutcomes"
                    name="learningOutcomes"
                    value={formData.learningOutcomes}
                    onChange={handleChange}
                    placeholder="Comma separated outcomes"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                  />
                </div>
                <div>
                  <label htmlFor="syllabusPDF" className="block text-sm font-medium text-gray-700">Syllabus PDF</label>
                  <input
                    type="file"
                    id="syllabusPDF"
                    name="syllabusPDF"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                  />
                </div>
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Comma separated tags"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                  />
                </div>
              </div>
            </section>

            {/* 5. Teacher Details */}
            <section className="border-b pb-6">
              <h3 className="text-2xl font-bold mb-6 text-[#5491CA]">Teacher Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Teacher Name</label>
                  <select
                    id="teacher"
                    name="teacher"
                    value={teacher.userName}
                    onChange={(e) => {
                      handleChange(e);
                      const selectedTeacher = teachers.find(t => t.userName === e.target.value);
                      setTeacher(selectedTeacher || {});
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                    required
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher, index) => (
                      <option key={index} value={teacher.email}>{teacher.userName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* 6. Enrollment Settings */}
            <section className="border-b pb-6">
              <h3 className="text-2xl font-bold mb-6 text-[#5491CA]">Enrollment Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700">Max Students Allowed</label>
                  <input
                    type="number"
                    id="maxStudents"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="enrollmentDeadline" className="block text-sm font-medium text-gray-700">Enrollment Deadline</label>
                  <input
                    type="date"
                    id="enrollmentDeadline"
                    name="enrollmentDeadline"
                    value={formData.enrollmentDeadline}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                    required
                  />
                </div>
              </div>
            </section>

            {/* 7. Pricing */}
            <section>
              <h3 className="text-2xl font-bold mb-6 text-[#5491CA]">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Course Fee</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                  />
                </div>
              </div>
            </section>

            {/* Buttons */}
            <section className="flex justify-end gap-4 mt-8 pt-4 border-t">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 flex items-center transition-colors"
              >
                <RefreshCcw className="h-5 w-5 mr-2" />
                Reset
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className={`bg-[#5491CA] text-white px-6 py-3 rounded-lg flex items-center ${loading ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#4a82b6]'} transition-colors shadow-md`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Create Course
                  </>
                )}
              </button>
            </section>
          </form>
        </div>
      )}
    </>
  );
};

export default CourseManagementForm;
