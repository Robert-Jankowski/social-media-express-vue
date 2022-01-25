import { Router } from 'express';
import { loginHandler } from './login';
import { logoutHandler } from './logout';
import { registerHandler } from './register';

const routes = Router({
  mergeParams: true,
});

// LOGIN
routes.post('/login', loginHandler);

// LOGOUT
routes.post('/logout', logoutHandler);

// REGISTER
routes.post('/register', registerHandler);

export default routes;
