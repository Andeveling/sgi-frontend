import { useAuthStore } from '@/store/auth/auth.store';
import { getValidationError } from '@/utilities/get-validation-error';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3010/api',
});

// Interceptors for auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptors for response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error", getValidationError(error.response?.status))
    return Promise.reject(error);
  },
);

export default api;
