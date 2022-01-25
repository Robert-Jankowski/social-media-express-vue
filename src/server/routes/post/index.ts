import { Router } from 'express';
import { authenticateToken } from '../../authentication/auth-middleware';
import {postCommentHandler} from './post-comment';

const routes = Router({
  mergeParams: true,
});

// POST COMMENT
routes.post('/', authenticateToken, postCommentHandler);

export default routes;
