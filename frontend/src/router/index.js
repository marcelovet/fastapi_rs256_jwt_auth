import { createRouter, createWebHistory } from 'vue-router';
import store from '@/stores';

import Home from '@/views/Home.vue'; // TODO
import Login from '@/views/Login.vue'; // TODO
import Profile from '@/views/Profile.vue'; // TODO
import Users from '@/views/Users.vue'; // TODO

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// routes guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  
  // routes that require authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } 
  // routes that are only accessible to guests
  else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
