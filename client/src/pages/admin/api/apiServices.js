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
export const deleteStudent = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:4400/students/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting student');
  }
};

export const deleteTeacher = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:4400/teachers/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting teacher');
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



export const getAssignedCourses = async (studentId) => {
  const { data } = await axios.get(`http://localhost:4400/api/course-assign/assigned/${studentId}`);
  return data.assignedCourses;
};

// Fetch unassigned courses for a student
export const getUnassignedCourses = async (studentId) => {
  const { data } = await axios.get(`http://localhost:4400/api/course-assign/unassigned/${studentId}`);
  return data;
};

// Assign a course to a student
export const assignCourseToStudent = async (studentId, courseId) => {
  await axios.post(`http://localhost:4400/api/course-assign/assign`, { studentId, courseId });
};

// Remove a course from a student
export const removeCourseFromStudent = async (studentId, courseId) => {
  await axios.post('http://localhost:4400/api/course-assign/remove', { studentId, courseId });
};
