import axios from 'axios';

// Define the base URL
const BASE_URL = 'http://localhost:4400/course';

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create the service methods
const courseService = {
  // Create a new course

  createCourse: async (courseData) => {
    try {
      const response = await api.post('/cr', courseData);
      console.log("api call done ");
      
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get a course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Update a course by ID
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  // Delete a course by ID
  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },
};

export default courseService;
