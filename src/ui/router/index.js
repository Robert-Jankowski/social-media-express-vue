import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import WallPage from "../views/WallPage";
import FriendsPage from "../views/FriendsPage";

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
    path: '/friends',
    name: 'FriendsPage',
    component: FriendsPage,
    meta: {
      requiresAuth: false,
    },
  },
  // {
  //   path: '/wall/:userId/private',
  //   name: 'Wall',
  //   component: Wall,
  //   meta: {
  //     requiresAuth: true,
  //   }
  // },
  {
    path: '/wall/:userId/',
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
