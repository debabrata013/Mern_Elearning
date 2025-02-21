// src/services/quizeservices.js
import axios from 'axios';

// Define the API base URL (adjust as needed or use environment variables)
const API_BASE_URL = "http://localhost:4400";

const QuizServices = {
  // Create a new quiz
  createQuiz: (quizData) => {
    return axios.post(`${API_BASE_URL}/quiz`, quizData);
  },

  // Retrieve a quiz by its ID (with questions populated)
  getQuizById: (quizId) => {
    return axios.get(`${API_BASE_URL}/quiz/${quizId}`);
  },

  // Update quiz details by ID
  updateQuiz: (quizId, updateData) => {
    return axios.put(`${API_BASE_URL}/quiz/${quizId}`, updateData);
  },

  // Delete a quiz by ID
  deleteQuiz: (quizId) => {
    return axios.delete(`${API_BASE_URL}/quiz/${quizId}`);
  },

  // Add a new question to an existing quiz
  createQuestion: (quizId, questionData) => {
    return axios.post(`${API_BASE_URL}/quiz/${quizId}/question`, questionData);
  },

  // Submit a student's quiz response
  submitResponse: (quizId, responseData) => {
    return axios.post(`${API_BASE_URL}/quiz/${quizId}/response`, responseData);
  },

  // Retrieve a student's response for a particular quiz
  getResponse: (quizId) => {
    return axios.get(`${API_BASE_URL}/quiz/${quizId}/response`);
  }
};

export default QuizServices;
