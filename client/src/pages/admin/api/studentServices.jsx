import axios from 'axios';

const API_URL = 'http://localhost:4400/api/students';

// Create a new student
export const createStudent = async (studentData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, studentData);
        return response.data;
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
};

// Update an existing student
export const updateStudent = async (studentId, studentData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${studentId}`, studentData);
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};

// Delete a student
export const deleteStudent = async (studentId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
};

// Search students by email
export const searchStudentByEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/search/email`, { params: { email } });
        return response.data;
    } catch (error) {
        console.error('Error searching student by email:', error);
        throw error;
    }
};

// Search students by name
export const searchStudentByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/search/name`, { params: { name } });
        return response.data;
    } catch (error) {
        console.error('Error searching student by name:', error);
        throw error;
    }
};

// View all students
export const viewAllStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error viewing all students:', error);
        throw error;
    }
};
