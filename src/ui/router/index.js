import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import MainPage from '../views/MainPage.vue';
import Wall from "../views/Wall";

const routes = [
  {
    path: '/',
    redirect: '/login',
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
    path: '/wall/:userId/private',
    name: 'Wall',
    component: Wall,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/wall/:userId/',
    name: 'Wall',
    component: Wall,
    meta: {
      requiresAuth: false,
    }
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

  if (to.fullPath === '/login') {
    return next();
  }

  if (to.meta.requiresAuth) {
    return store.getters.isLogged ? next() : next({name: 'Login'});
  }

  return next();
});


export default router;
