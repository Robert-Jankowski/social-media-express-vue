import { Router, Request, Response } from 'express';

// COMMON PATH - /user

const routes = Router();

// Method:        GET
// Summary:       get user data
// Description:
// Permissions:   user/friends
// Response:      { ...userData }
routes.get('/:id', (req: Request, res: Response) => {
  return res.send().status(200);
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
routes.patch('/:id', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        POST
// Summary:       login to account
// Description:   if login and password are correct then create session for user
// Permissions:   anyone
// Body:          { login, password }
// Response:      { userId } - create session
routes.post('/login', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        POST
// Summary:       logout
// Description:   delete session
// Permissions:   user
// Response:      { userId }
routes.post('/logout', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        POST
// Summary:       register new account
// Description:   if login is not occupied create account
// Permissions:   anyone
// Body:          { login, password }
// Response:      { userId }
routes.post('/register', (req: Request, res: Response) => {
  return res.send().status(200);
});

export default routes;
