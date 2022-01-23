import {createRouter, createWebHistory} from 'vue-router';
import store from '../store/index';
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import WallPage from "../views/WallPage";
import FriendsPage from "../views/FriendsPage";
import ProfilePage from "../views/ProfilePage";
import {isNil} from "lodash";

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
      requiresAuth: true,
    },
  },
  {
    path: '/user/:username/profile',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/friends',
    name: 'FriendsPage',
    component: FriendsPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/wall/:username',
    name: 'WallPage',
    component: WallPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/wall/:username/private',
    name: 'PrivateWallPage',
    component: WallPage,
    props: {
      isPrivate: true,
    },
    meta: {
      requiresAuth: true,
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

  if (to.fullPath === '/login' && store.getters.isLogged) {
    return next({name: 'HomePage'});
  }

  if (to.fullPath === '/login') {
    return next();
  }

  if (to.meta.requiresAuth) {
    return !isNil(store.state.user) ? next() : next({name: 'Login'});
  }

  return next();
});


export default router;
