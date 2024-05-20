import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      showSessionExpiredDialog: false,
      subscriptionPlan: JSON.parse(localStorage.getItem('subscriptionPlan')) || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
      isUserConnected: localStorage.getItem('isUserConnected') === 'true',
      accessToken: localStorage.getItem('access_token') || null,
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
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isUserConnected = false;
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('subscriptionPlan');
      localStorage.setItem('isUserConnected', false);
    }
  },
  actions: {
    login({ commit }, { user, accessToken, subscriptionPlan }) {
      commit('loginSuccess', { user, accessToken, subscriptionPlan });
    }
  }
});

export default store;
