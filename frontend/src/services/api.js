import axios from 'axios';
import store from '@/stores';
import router from '@/router'; // TODO: must implement

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token a todas as requisições
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

// Interceptor para lidar com erros de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Se receber erro 401 (não autorizado) e não estiver tentando renovar token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Tentar renovar o token
        const refreshToken = store.getters['auth/refreshToken'];
        if (refreshToken) {
          const response = await axios.post('http://localhost:8000/auth/refresh', { token: refreshToken });
          const { access_token } = response.data;
          
          // Atualizar token na store
          store.dispatch('auth/setTokens', { access_token, refresh_token: refreshToken });
          
          // Refazer a requisição original com o novo token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se a renovação falhar, fazer logout e redirecionar para login
        store.dispatch('auth/logout');
        router.push('/login');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;