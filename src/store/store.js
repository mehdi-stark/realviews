import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
      isUserConnected: localStorage.getItem('isUserConnected') === 'true',
      accessToken: localStorage.getItem('access_token') || null,
    };
  },
  mutations: {
    loginSuccess(state, { user, accessToken }) {
      state.user = user;
      state.accessToken = accessToken;
      state.isUserConnected = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isUserConnected', 'true');
      localStorage.setItem('access_token', accessToken);
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isUserConnected = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isUserConnected');
      localStorage.removeItem('access_token');
    }
  },
  actions: {
    login({ commit }, { user, accessToken }) {
      commit('loginSuccess', { user, accessToken });
    }
  }
});

export default store;
