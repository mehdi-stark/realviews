import api from '@/api';
import { jwtDecode } from 'jwt-decode';
import { createStore } from 'vuex';

const store = createStore({
  
  state() {
    return {
      showSessionExpiredDialog: false,
      subscriptionPlan: localStorage.getItem('subscriptionPlan') && localStorage.getItem('subscriptionPlan') !== 'undefined' ? JSON.parse(localStorage.getItem('subscriptionPlan')) : null,
      user: localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null,
      isUserConnected: localStorage.getItem('isUserConnected') === 'true',
      accessToken: localStorage.getItem('access_token') || null,
      refreshToken: localStorage.getItem('refresh_token') || null
    };
  },

  mutations: {
    showSessionExpiredDialog(state) {
      state.showSessionExpiredDialog = true;
    },
    loginSuccess(state, { user, accessToken, subscriptionPlan }) {
      state.user = user;
      state.accessToken = accessToken;
      state.subscriptionPlan = subscriptionPlan;
      state.isUserConnected = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('subscriptionPlan', JSON.stringify(subscriptionPlan));
      localStorage.setItem('isUserConnected', 'true');
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', user.refreshToken);
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.subscriptionPlan = null;
      state.isUserConnected = false;
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('subscriptionPlan');
      localStorage.removeItem('refresh_token');
      localStorage.setItem('isUserConnected', false);
    },
    closeSessionExpiredDialog(state) {
      state.showSessionExpiredDialog = false;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
    }
  },

  actions: {
    refreshToken({ commit, state }) {
      try {
        const response = api.get('/api/auth/refresh-token', {
          refreshToken: state.refreshToken,
        });
        commit('setAccessToken', response.data.accessToken);
        return response.data.accessToken;
      } catch (error) {
        commit('clearTokens');
        throw error;
      }
    },
    
    checkTokenExpiration({ dispatch, state }) {
      if (!state.accessToken) return;

      const decoded = jwtDecode(state.accessToken);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        dispatch('refreshToken').catch(() => {
          dispatch('logout');
        });
      }
    },

    login({ commit }, { user, accessToken, refreshToken, subscriptionPlan }) {
      commit('loginSuccess', { user, accessToken, refreshToken, subscriptionPlan });
    },
    
    logout({ commit }) {
      commit('logout');
      commit('clearTokens');
    },
    
    closeSessionExpiredDialog({ commit }) {
      commit('closeSessionExpiredDialog');
    }
  }
});

export default store;
