import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4400',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add token from cookie
instance.interceptors.request.use((config) => {
  const cookies = document.cookie.split(';');
  const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
  
  if (accessTokenCookie) {
    const token = accessTokenCookie.split('=')[1];
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default instance; 