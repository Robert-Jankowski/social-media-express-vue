import { Store } from 'vuex';
import { isNil } from 'lodash';

const store = new Store({
  state() {
    return {
      user: null,
      askForLogin: true,
      newRequests: false,
    }
  },
  mutations: {
    SET_ASKED(state, asked) {
      state.askForLogin = asked;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_NEW_REQUESTS(state, newRequests) {
      state.newRequests = newRequests;
    }
  },
  getters: {
    isLogged(state) {
      return !isNil(state.user?.id);
    },
    userId(state) {
      return state?.user?.id;
    },
    username(state) {
      return state?.user?.username;
    },
    askForLogin(state) {
      return state.askForLogin;
    },
    newRequests(state) {
      return state.newRequests;
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;
