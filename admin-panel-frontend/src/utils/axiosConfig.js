import axios from 'axios';
import { toast } from 'react-toastify';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://adminapi.pathologica.ru/api',
  withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      toast.error('Сессия истекла. Пожалуйста, войдите снова.');
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
