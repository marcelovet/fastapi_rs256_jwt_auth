import api from './api';

export default {
  login(email, password) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    return api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  refreshToken(token) {
    return api.post('/auth/refresh', { token });
  },
  
  getProfile() {
    return api.get('/auth/users/me');
  },
  
  getUsers() {
    return api.get('/users');
  },
  
  getUser(id) {
    return api.get(`/users/${id}`);
  },
};