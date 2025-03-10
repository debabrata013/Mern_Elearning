import React, { useState, useEffect } from 'react';
import { Edit, Trash, Eye, Save, RefreshCcw, Loader2, ArrowLeft } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import courseService from './api/courseService';
import { toast } from 'react-toastify';

// Default images for courses without cover images
const defaultImages = {
  'Programming': 'https://via.placeholder.com/300x200?text=Programming',
  'Design': 'https://via.placeholder.com/300x200?text=Design',
  'Business': 'https://via.placeholder.com/300x200?text=Business',
  'Data Science': 'https://via.placeholder.com/300x200?text=Data+Science',
  'Marketing': 'https://via.placeholder.com/300x200?text=Marketing',
  'Default': 'https://via.placeholder.com/300x200?text=Course'
};

// Categories for dropdown
const categories = ['Programming', 'Design', 'Business', 'Data Science', 'Marketing'];

// Enhanced Loader Component
const EnhancedLoader = ({ message = "Loading Course Data" }) => {
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

const CourseEditPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getAllCourses();
      setCourses(response);
      setError(null);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to fetch courses. Please try again later.');
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  // Fetch teachers for dropdown
  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get('/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error('Failed to load teachers');
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? Number(value) : '') : value
    }));
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
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
    setFormData(prevFormData => ({
      ...prevFormData,
      chapters: prevFormData.chapters.filter((_, i) => i !== index),
    }));
  };

  // Start editing a course
  const handleEditCourse = (course) => {
    // Create a copy of the course for editing
    const courseForEdit = {
      ...course,
      // Ensure chapters is an array
      chapters: course.chapters || [{ title: '', description: '' }],
      // Ensure other arrays are initialized
      prerequisites: course.prerequisites || [],
      learningOutcomes: course.learningOutcomes || [],
      tags: course.tags || []
    };
    
    setEditingCourse(course);
    setFormData(courseForEdit);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCourse(null);
    setFormData(null);
  };

  // Delete a course
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        setLoading(true);
        await courseService.deleteCourse(courseId);
        toast.success('Course deleted successfully');
        fetchCourses(); // Refresh the course list
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      } finally {
        setLoading(false);
      }
    }
  };

  // Submit updated course
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const dataToSend = new FormData();
      
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'coverImage' && key !== 'introVideo' && key !== 'syllabusPDF') {
          if (Array.isArray(formData[key])) {
            dataToSend.append(key, JSON.stringify(formData[key]));
          } else if (formData[key] !== null && formData[key] !== undefined) {
            dataToSend.append(key, formData[key]);
          }
        }
      });
      
      // Handle file uploads
      if (formData.coverImage && formData.coverImage instanceof File) {
        dataToSend.append('coverImage', formData.coverImage);
      }
      
      if (formData.introVideo && formData.introVideo instanceof File) {
        dataToSend.append('introVideo', formData.introVideo);
      }
      
      if (formData.syllabusPDF && formData.syllabusPDF instanceof File) {
        dataToSend.append('syllabusPDF', formData.syllabusPDF);
      }
      
      // Update the course
      const response = await courseService.updateCourse(editingCourse._id, dataToSend);
      
      toast.success('Course updated successfully');
      setEditingCourse(null);
      setFormData(null);
      fetchCourses(); // Refresh the course list
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error(error.response?.data?.message || 'Failed to update course');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter courses based on search term and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === '' || course.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get appropriate image for course
  const getCourseImage = (course) => {
    if (course.coverImage) {
      return course.coverImage;
    }
    return defaultImages[course.category] || defaultImages['Default'];
  };

  if (loading && !editingCourse) {
    return <EnhancedLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {editingCourse ? (
        // Edit Course Form
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={handleCancelEdit}
              className="mr-4 text-[#5491CA] hover:text-[#4a82b6] transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-[#5491CA]">Edit Course: {editingCourse.title}</h2>
          </div>
          
          {isSubmitting && <EnhancedLoader message="Updating Course" />}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Course Details */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-[#5491CA]">Course Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
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
                  <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
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
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
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
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
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
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
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
                  <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
                  {formData.coverImage && !formData.coverImage instanceof File && (
                    <div className="mb-2">
                      <img 
                        src={formData.coverImage} 
                        alt="Current cover" 
                        className="h-20 w-auto object-cover rounded"
                      />
                      <p className="text-xs text-gray-500 mt-1">Current image</p>
                    </div>
                  )}
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
                  <label htmlFor="introVideo" className="block text-sm font-medium text-gray-700">Intro Video</label>
                  {formData.introVideo && !formData.introVideo instanceof File && (
                    <p className="text-xs text-gray-500 mb-2">Current video is set</p>
                  )}
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

            {/* Schedule & Duration */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-[#5491CA]">Schedule & Duration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate ? formData.startDate.split('T')[0] : ''}
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
                    value={formData.endDate ? formData.endDate.split('T')[0] : ''}
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

            {/* Content Management */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-[#5491CA]">Content Management</h3>
              <div>
                <label htmlFor="syllabusPDF" className="block text-sm font-medium text-gray-700">Syllabus PDF</label>
                {formData.syllabusPDF && !formData.syllabusPDF instanceof File && (
                  <p className="text-xs text-gray-500 mb-2">Current syllabus is set</p>
                )}
                <input
                  type="file"
                  id="syllabusPDF"
                  name="syllabusPDF"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-[#5491CA] focus:border-[#5491CA]"
                />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Chapters/Modules</h4>
                {formData.chapters && formData.chapters.map((chapter, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start gap-4 mb-6 border p-4 rounded-md">
                    <div className="w-full">
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
                    <div className="w-full">
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
                      className="text-[#b1a9f1] hover:text-[#9f97e8] self-end mt-2 md:mt-0"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addChapter}
                  className="flex items-center text-[#5491CA] font-medium hover:text-[#4a82b6]"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Add Chapter
                </button>
              </div>
            </section>

            {/* Pricing */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-[#5491CA]">Pricing</h3>
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
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#5491CA] text-white rounded-md hover:bg-[#4a82b6] transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Course List View
        <>
          <h1 className="text-2xl font-bold mb-6 text-[#5491CA]">Edit Courses</h1>
          
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#5491CA] focus:border-[#5491CA]"
              />
            </div>
            <div className="w-full md:w-64">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#5491CA] focus:border-[#5491CA]"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={getCourseImage(course)} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-[#5491CA] line-clamp-1">{course.title}</h3>
                      <span className="bg-[#b1a9f1] text-white text-xs px-2 py-1 rounded-full">
                        {course.level || 'All Levels'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{course.category || 'Uncategorized'}</span>
                      <span>{course.duration ? `${course.duration} weeks` : 'Self-paced'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#5491CA] font-bold">
                        {course.price ? `₹${course.price}` : 'Free'}
                        {course.discount > 0 && (
                          <span className="text-green-600 text-xs ml-2">
                            {course.discount}% off
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditCourse(course)}
                          className="p-2 text-[#5491CA] hover:bg-[#5491CA] hover:text-white rounded-full transition-colors"
                          title="Edit Course"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course._id)}
                          className="p-2 text-[#b1a9f1] hover:bg-[#b1a9f1] hover:text-white rounded-full transition-colors"
                          title="Delete Course"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {searchTerm || filterCategory 
                  ? 'No courses match your search criteria.' 
                  : 'No courses available. Add some courses first.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseEditPage; 