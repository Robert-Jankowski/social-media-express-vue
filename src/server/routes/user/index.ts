import { Router } from 'express';
import { authenticateToken } from '../../authentication/auth-middleware';
import { getProfileHandler } from './get-profile';
import { addPostHandler } from './add-post';
import { editProfileHandler } from './edit-profile';

const routes = Router({
  mergeParams: true,
});

// GET USER PROFILE
routes.get('/:username', authenticateToken, getProfileHandler);

// ADD NEW POST
routes.post('/:userId', authenticateToken, addPostHandler);

// EDIT USER DATA
routes.put('/:userId', authenticateToken, editProfileHandler);

export default routes;
