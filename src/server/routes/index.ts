import { Router } from 'express';

import friendsRoutes from './friends';
import authRoutes from './auth';
import userRoutes from './user';
import wallRoutes from './wall';
import postRoutes from './post';

const routes = Router();

routes.use('/user/:userId/friends', friendsRoutes);
routes.use('/user/', authRoutes);
routes.use('/user', userRoutes);
routes.use('/wall/:username', wallRoutes);
routes.use('/post/:postId', postRoutes);


export default routes;
