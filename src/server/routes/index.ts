import {Router} from 'express';
import userRoutes from './user-routes';
import wallRoutes from './wall-routes';
import friendsRoutes from './friends-routes';
import authRoutes from './auth-routes';
import postRoutes from './post-routes';

const routes = Router();

routes.use('/user/:userId/friends', friendsRoutes);
routes.use('/user/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/wall/:username', wallRoutes);
routes.use('/post/:postId', postRoutes);


export default routes;
