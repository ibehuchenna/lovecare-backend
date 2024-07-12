import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2000/api', // Adjust as per your backend URL
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
