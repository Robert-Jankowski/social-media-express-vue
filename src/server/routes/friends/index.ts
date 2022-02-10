import {RequestHandler, Router} from 'express';
import { authenticateToken } from '../../authentication/auth-middleware';
import {getFriendsHandler} from './get-friends';
import {inviteFriendHandler} from './invite-friend';
import {deleteFriendHandler} from './delete-friend';
import {acceptFriendHandler} from './accept-friend';
import {denyFriendHandler} from './deny-friend';

const routes = Router({
  mergeParams: true,
});

// GET FRIENDS
routes.get('/', authenticateToken, getFriendsHandler);

// INVITE FRIEND
routes.post('/:friendUsername/invite', authenticateToken, inviteFriendHandler);

// DELETE FRIEND
routes.delete('/:friendUsername', authenticateToken, deleteFriendHandler);

// ACCEPT INVITATION
routes.post('/:friendUsername/accept', authenticateToken, acceptFriendHandler);

// DENY INVITATION
routes.delete('/:friendUsername/deny', authenticateToken, denyFriendHandler);


export default routes;
