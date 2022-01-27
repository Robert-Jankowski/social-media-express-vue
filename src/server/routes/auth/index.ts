import { Router } from 'express';
import { loginHandler } from './login';
import { registerHandler } from './register';

const routes = Router({
  mergeParams: true,
});

// LOGIN
routes.post('/login', loginHandler);

// REGISTER
routes.post('/register', registerHandler);

export default routes;
