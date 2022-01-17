import { Router, Request, Response } from 'express';
import { userAuthorization } from "../util/auth-utils";

// COMMON PATH - /user

const routes = Router();

// Method:        GET
// Summary:       get user data
// Description:
// Permissions:   user/friends
// Response:      { ...userData }
routes.get('/:id', userAuthorization, (req: Request, res: Response) => {
  return res.status(200).send({ id: 5});
});

// Method:        POST
// Summary:       add new post (private\public\general)
// Description:
// Permissions:   user/friends
// Body:          { postContent, type }
// Response:      { postId }
routes.post('/:id', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        PATCH
// Summary:       edit user data
// Description:
// Permissions:   user
// Body:          { ...userData }
// Response:      { ...userData }
routes.patch('/:id', userAuthorization, (req: Request, res: Response) => {
  return res.send().status(200);
});

export default routes;
