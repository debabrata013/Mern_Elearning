import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:4400/api/jobs',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handler helper
const handleError = (error, operation) => {
  console.error(`Error ${operation}:`, error?.response?.data || error.message);
  throw error;
};

const jobService = {
  getAllJobs: async () => {
    try {
      const { data } = await api.get('/');
      return data;
    } catch (error) {
      handleError(error, 'fetching jobs');
    }
  },

  createJob: async (jobData) => {
    try {
      console.log("Job Data:", jobData);
      const { data } = await api.post('/', jobData);
      console.log("Response Data:", data);
      return data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No Response:", error.request);
      } else {
        // Something else happened
        console.error("Error Message:", error.message);
      }
      handleError(error, 'creating job');
    }
  },

  updateJob: async (jobId, updatedData) => {
    try {
      const { data } = await api.put(`/${jobId}`, updatedData);
      return data;
    } catch (error) {
      handleError(error, 'updating job');
    }
  },

  deleteJob: async (jobId) => {
    try {
      const { data } = await api.delete(`/${jobId}`);
      return data;
    } catch (error) {
      handleError(error, 'deleting job');
    }
  }
};

export default jobService;
