import axios from 'axios';

export const createTeacher = async (teacherData) => {
  try {
    const response = await axios.post('http://localhost:4400/teachers/', teacherData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating teacher');
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post('http://localhost:4400/students/', studentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating student');
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:4400/students/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

export const getAllTeachers = async () => {
  try {
    const response = await axios.get('http://localhost:4400/teachers/');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching teachers');
  }
};
export const getAllStudents = async () => {
  try {
    const response = await axios.get('http://localhost:4400/students/');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching students');
  }
};