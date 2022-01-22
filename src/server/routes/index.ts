import {Router} from 'express';
import userRoutes from './user-routes';
import wallRoutes from './wall-routes';
import friendsRoutes from './friends-routes';
import authRoutes from './auth-routes';

const routes = Router();

routes.use('/user/:userId/friends', friendsRoutes);
routes.use('/user/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/wall/:username', wallRoutes);


export default routes;
