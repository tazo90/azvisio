import { authService } from '@/modules/auth/services/auth-service';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = authService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = authService.getRefreshToken();
      if (!refreshToken) {
        await authService.logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Try refresh token
        const { refresh } = await api.auth;
        const response = await refresh({ refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Save new token
        await authService.login({ accessToken, refreshToken: newRefreshToken }, authService.getUser());

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        // return api(originalRequest)
      } catch (refreshError) {
        await authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);
