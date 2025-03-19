import axios from 'axios';
import axiosInstance from '../../../api/axiosInstance';

// Set the base URL for your backend API
const BASE_URL = 'http://localhost:4400/courses';
const api = axios.create({
  baseURL: BASE_URL,
});

const courseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await axiosInstance.get('/courses/getallCourse');
    
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a single course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await axiosInstance.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course with ID ${courseId}:`, error);
      throw error;
    }
  },

  // Create a new course
  createCourse: async (courseData) => {
    let dataToSend;

    // If courseData is already an instance of FormData, use it as is.
    if (courseData instanceof FormData) {
      dataToSend = courseData;
    } else {
      dataToSend = new FormData();
      // Append each field from courseData properly, handling files
      Object.keys(courseData).forEach((key) => {
        if (Array.isArray(courseData[key])) {
          courseData[key].forEach((item, index) => {
            dataToSend.append(`${key}[${index}]`, item);
          });
        } else {
          dataToSend.append(key, courseData[key]);
        }
      });
    }

    try {
      const response = await api.post('/', dataToSend, {
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

  // Update an existing course
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await axiosInstance.put(`/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      console.error(`Error updating course with ID ${courseId}:`, error);
      throw error;
    }
  },

  // Delete a course
  deleteCourse: async (courseId) => {
    try {
      const response = await axiosInstance.delete(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting course with ID ${courseId}:`, error);
      throw error;
    }
  },

  // Other methods...
};

export default courseService;