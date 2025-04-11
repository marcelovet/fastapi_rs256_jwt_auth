import authService from '@/services/authService';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const state = {
  accessToken: localStorage.getItem(TOKEN_KEY) || '',
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || '',
  user: null,
  loading: false,
  error: null,
};

const getters = {
  isAuthenticated: (state) => !!state.accessToken,
  accessToken: (state) => state.accessToken,
  refreshToken: (state) => state.refreshToken,
  user: (state) => state.user,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

const actions = {
  async login({ commit }, { email, password }) {
    commit('AUTH_REQUEST');
    try {
      const response = await authService.login(email, password);
      const { access_token, refresh_token } = response.data;
      
      commit('AUTH_SUCCESS', { access_token, refresh_token });
      return await dispatch('fetchUser');
    } catch (error) {
      commit('AUTH_ERROR', error.response?.data?.detail || 'Authentication failed');
      throw error;
    }
  },
  
  async fetchUser({ commit }) {
    try {
      const response = await authService.getProfile();
      const user = response.data;
      commit('SET_USER', user);
      return user;
    } catch (error) {
      console.error('Error while searching user:', error);
      throw error;
    }
  },
  
  setTokens({ commit }, { access_token, refresh_token }) {
    commit('AUTH_SUCCESS', { access_token, refresh_token: refresh_token || state.refreshToken });
  },
  
  logout({ commit }) {
    commit('LOGOUT');
  },
};

const mutations = {
  AUTH_REQUEST(state) {
    state.loading = true;
    state.error = null;
  },
  
  AUTH_SUCCESS(state, { access_token, refresh_token }) {
    state.accessToken = access_token;
    state.refreshToken = refresh_token;
    state.loading = false;
    state.error = null;
    
    // Salvar tokens no localStorage
    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  },
  
  AUTH_ERROR(state, error) {
    state.loading = false;
    state.error = error;
  },
  
  SET_USER(state, user) {
    state.user = user;
  },
  
  LOGOUT(state) {
    state.accessToken = '';
    state.refreshToken = '';
    state.user = null;
    
    // Remover tokens do localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};