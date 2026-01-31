import axios from 'axios';
import conf from '../conf/conf';

const api = axios.create({
  baseURL: conf.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/* 🔐 Request Interceptor (Token Attach) */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* 🚨 Response Interceptor (Error Handle) */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, logging out...');

      localStorage.removeItem('token');
      window.location.href = '/login'; // React route
    }

    return Promise.reject(error);
  }
);

export default api;
