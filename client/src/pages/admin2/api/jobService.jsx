// src/services/jobService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4400/api/jobs';  // Backend API URL

const jobService = {
  // Get all jobs
  getAllJobs: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs", error);
      throw error;
    }
  },

  // Create a new job
  createJob: async (jobData) => {
    try {
        console.log("creating a job");
        
      const response = await axios.post(BASE_URL, jobData);
      return response.data;
    } catch (error) {
      console.error("Error creating job", error);
      throw error;
    }
  },

  // Update an existing job
  updateJob: async (jobId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${jobId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating job", error);
      throw error;
    }
  },

  // Delete a job
  deleteJob: async (jobId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${jobId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting job", error);
      throw error;
    }
  },
};

export default jobService;
