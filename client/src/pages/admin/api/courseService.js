import axios from 'axios';

// Set the base URL for your backend API
const BASE_URL = 'http://localhost:4400/courses';

const api = axios.create({
  baseURL: BASE_URL,
});

const courseService = {
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

  // Other methods...
};

export default courseService;