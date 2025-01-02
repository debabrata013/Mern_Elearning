import axios from 'axios';

const API_URL = 'http://localhost:4400/api/teachers';

// Create a new teacher
export const createTeacher = async (teacherData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, teacherData);
        return response.data;
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw error;
    }
};

// Update an existing teacher
export const updateTeacher = async (teacherId, teacherData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${teacherId}`, teacherData);
        return response.data;
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
};

// Delete a teacher
export const deleteTeacher = async (teacherId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${teacherId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting teacher:', error);
        throw error;
    }
};

// Get a teacher by ID
export const getTeacherById = async (teacherId) => {
    try {
        const response = await axios.get(`${API_URL}/${teacherId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching teacher:', error);
        throw error;
    }
};
// Search teachers by email
export const searchTeachersByEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/search/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error searching teachers by email:', error);
        throw error;
    }
};

// Search teachers by name
export const searchTeachersByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/search/name/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error searching teachers by name:', error);
        throw error;
    }
};


// Get all teachers
export const getAllTeachers = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
};
