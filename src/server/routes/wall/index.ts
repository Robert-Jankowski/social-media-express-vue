import { Router } from 'express';
import { authenticateToken } from '../../authentication/auth-middleware';
import { getWallHandler } from './get-wall';
import { getPrivateWallHandler } from "./get-private-wall";

const routes = Router({
  mergeParams: true,
});

// GET PRIVATE WALL
routes.get('/private', authenticateToken, getPrivateWallHandler);

// GET WALL
routes.get('/', authenticateToken, getWallHandler);



export default routes;
