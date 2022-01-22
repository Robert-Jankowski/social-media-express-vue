import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import WallPage from "../views/WallPage";
import FriendsPage from "../views/FriendsPage";
import ProfilePage from "../views/ProfilePage";

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/user/:userId/profile', // userId -> username
    name: 'ProfilePage',
    component: ProfilePage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/friends',
    name: 'FriendsPage',
    component: FriendsPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/wall/:username/',  // userId -> username
    name: 'WallPage',
    component: WallPage,
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
