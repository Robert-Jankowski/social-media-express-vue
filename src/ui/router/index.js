import {createRouter, createWebHistory} from 'vue-router';
import store from '../store/index';
import dataService from '../services/DataService';
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import WallPage from "../views/WallPage";
import FriendsPage from "../views/FriendsPage";
import ProfilePage from "../views/ProfilePage";
import WrongRoutePage from "../views/WrongRoutePage";
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
  {
    path: '/:pathMatch(.*)*',
    name: 'WrongRoutePage',
    component: WrongRoutePage,
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

  if (!store.getters.isLogged) {

    const token = sessionStorage.getItem('microwall-jwt');

    if (isNil(token)) {

      if (to.meta.requiresAuth) {

          return next({name: 'Login'});
        }

      return next();
    }

    dataService.user.revive()
      .then((res) => {
        store.commit('SET_NEW_REQUESTS', res.data.newRequests)
        store.commit('SET_USER', res.data.user)

        if(to.fullPath === '/login' || to.fullPath === '/') {

          return next({name: 'HomePage'});
        }

        return next();
      }).catch((error) => {
      sessionStorage.removeItem('microwall-jwt');

      return next({name: 'Login'});
    })
  }

  if(to.fullPath === '/login' || to.fullPath === '/') {

    return next({name: 'HomePage'});
  }

  return next();
});


export default router;
