import axios from 'axios';

// Set the base URL for your backend API
const BASE_URL = 'http://localhost:4400/courses';
const api = axios.create({
  baseURL: BASE_URL,
});

const courseService = {
  // Create a new course (expects FormData for file uploads)
  createCourse: async (courseData) => {
    try {
      const formData = new FormData();
      
      // Append each field from courseData properly, handling files
      Object.keys(courseData).forEach((key) => {
        if (Array.isArray(courseData[key])) {
          courseData[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, courseData[key]);
        }
      });

      const response = await api.post('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Course created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get a specific course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update a course by ID (supports both JSON and FormData updates)
  updateCourse: async (courseId, courseData) => {
    try {
      const isFormData = courseData instanceof FormData;
      
      const response = await api.put(`/${courseId}`, courseData, {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error.response?.data || error.message);
      throw error;
    }
  },

  // Delete a course by ID
  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default courseService;