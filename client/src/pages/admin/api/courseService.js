import axios from 'axios';

// Set the base URL to match your backend mounted endpoint (e.g., /courses)
const BASE_URL = 'http://localhost:4400/courses';

const api = axios.create({
  baseURL: BASE_URL,
  // Default header for JSON requests; note that multipart requests override this header.
  headers: {
    'Content-Type': 'application/json',
  },
});

const courseService = {
  // Create a new course (expects FormData with file uploads)
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/', courseData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("API call done");
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

  // Update a course by ID (courseData can be JSON or FormData)
  updateCourse: async (courseId, courseData) => {
    try {
      const headers =
        courseData instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' };

      const response = await api.put(`/${courseId}`, courseData, { headers });
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
