import { createStore } from 'vuex';
import { isNil } from 'lodash';

export default createStore({
  state: {
    userInfo: null,
    askForLogin: true,
  },
  mutations: {
    SET_ASKED(state, asked) {
      state.askForLogin = asked;
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  getters: {
    isLogged(state) {
      return !isNil(state.userInfo);
    },
    userId(state) {
      return state.userInfo?._id;
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
