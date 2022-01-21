import { createStore } from 'vuex';
import { isNil } from 'lodash';

export default createStore({
  state() {
    return {
      user: null,
      askForLogin: true,
    }
  },
  mutations: {
    SET_ASKED(state, asked) {
      state.askForLogin = asked;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  getters: {
    isLogged(state) {
      return !isNil(state.userId);
    },
    userId(state) {
      return state?.user?.id;
    },
    username(state) {
      return state?.user?.username;
    },
    askForLogin(state) {
      return state.askForLogin;
    }
  },
  actions: {
  },
  modules: {
  }
})
