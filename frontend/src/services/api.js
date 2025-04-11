import axios from 'axios';
import store from '@/stores';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the access token to the request headers
api.interceptors.request.use(
  (config) => {
    const token = store.getters['auth/accessToken'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to deal with 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // if receives a 401 error and is not trying to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // tries to refresh the token
        const refreshToken = store.getters['auth/refreshToken'];
        if (refreshToken) {
          const response = await axios.post('http://localhost:8000/auth/refresh', { token: refreshToken });
          const { access_token } = response.data;
          
          // update the tokens in the store
          store.dispatch('auth/setTokens', { access_token, refresh_token: refreshToken });
          
          // do another request with the new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // if refresh fails, do logout and redirect to login
        store.dispatch('auth/logout');
        router.push('/login');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;