import { Router, Request, Response } from 'express';

// COMMON PATH - /wall/:userId/:wallType
// wallType = 'public' | 'private'

const routes = Router();

// Method:        GET
// Summary:       get user wall
// Description:   if wall is public and user not logged - get wall without comments / if friend - get public or private
// Permissions:   public - anyone / private - user or friends
// Response:      { wall }
routes.get('/', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        POST
// Summary:       post comment to wall
// Description:   check permissions, if successful notify everyone seeing board
// Permissions:   public - anyone logged / private - user or friends
// Body:          { commentContent, ? commentKey ? }
// Response:      { wall }
routes.post('/', (req: Request, res: Response) => {
  return res.send().status(200);
});

export default routes;
