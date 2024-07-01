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
      refreshToken: localStorage.getItem('refresh_token') || null,
      selectedPlanTitle: null,
    };
  },

  mutations: {
    showSessionExpiredDialog(state) {
      state.showSessionExpiredDialog = true;
    },
    loginSuccess(state, { user, accessToken, refreshToken, subscriptionPlan }) {
      state.user = user;
      state.accessToken = accessToken;
      state.subscriptionPlan = subscriptionPlan;
      state.isUserConnected = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('subscriptionPlan', JSON.stringify(subscriptionPlan));
      localStorage.setItem('isUserConnected', 'true');
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
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
    },
    incrementApiCalls(state) {
      state.subscriptionPlan.apiCallsMade += 1;
    },
    refreshSubscriptionPlan(state, subscriptionPlan) {
      state.subscriptionPlan = subscriptionPlan;
      localStorage.setItem('subscriptionPlan', JSON.stringify(subscriptionPlan));
    },
        // autres mutations...
    setSelectedPlanTitle(state, title) {
      state.selectedPlanTitle = title;
    },
  },

  actions: {
    refreshToken({ commit, state }) {
      try {
        console.log('Refresh token = ' + state.refreshToken);
        const response = api.get('/api/auth/refresh-token' + '?refreshToken=' + state.refreshToken, {});
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
    },

    refreshActiveSubscription({ commit, state }) {
      api.get('/api/v1/subscription-active' + '?userId=' + state.user.id)
        .then((response) => {
          commit('refreshSubscriptionPlan', response.data);
        })
        .catch((error) => {
          console.error('Error refreshing active subscription: ' + error);
        });
    }
  }
});

export default store;
