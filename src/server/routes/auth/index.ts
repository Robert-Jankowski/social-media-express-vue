import { Router } from 'express';
import { loginHandler } from './login';
import { registerHandler } from './register';
import {reviveHandler} from "./revive";
import {authenticateToken} from "../../authentication/auth-middleware";

const routes = Router({
  mergeParams: true,
});

// LOGIN
routes.post('/login', loginHandler);

// REGISTER
routes.post('/register', registerHandler);

// REVIVE
routes.post('/revive', authenticateToken, reviveHandler);

export default routes;
