import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import MainPage from '../views/MainPage.vue';
import { store } from "../../main";
import Wall from "../views/Wall";

const routes = [
  {
    path: '/',
    redirect: '/welcome',
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/welcome',
    name: 'MainPage',
    component: MainPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/wall/:userId/public',
    name: 'Wall',
    component: Wall,
    meta: {
      requiresAuth: false,
    },
    props: {
      wallType: 'PUBLIC',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

router.beforeEach((to, from, next) => {
  console.log(store.getters.askForLogin)

  if (to.fullPath === '/login') {
    return next();
  }

  if (to.meta.requiresAuth) {
    return store.getters.isLogged ? next() : next({name: 'Login'});
  }

  if (store.getters.askForLogin && to.fullPath !== '/login') {
    store.commit('SET_ASKED', false);
    return next({name: 'Login'});
  }

  return next();
});


export default router;
