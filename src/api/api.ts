import { useAuthStore } from '@/store/auth/auth.store';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  (error) => Promise.reject(error),
);

export default api;
