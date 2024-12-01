import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5159/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
  
  // Prevent automatic redirects
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Default
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;