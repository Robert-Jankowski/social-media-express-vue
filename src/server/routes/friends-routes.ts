import { Router, Request, Response } from 'express';

// COMMON PATH - /user/userId:/friends/

const routes = Router();

// Method:        DELETE
// Summary:       delete person from user friendList
// Description:
// Permissions:   user
// Response:      { deleted: true }
routes.delete('/:friendId', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        POST
// Summary:       invite friend
// Description:   add entry to friendRequests, notify person
// Permissions:   user
// Response:      { invited: true }
routes.post('/:friendId/invite', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        POST
// Summary:       accept user invitation
// Description:   remove friendRequest entry, add person to friendList, notify friend
// Permissions:   user
// Response:      { approved: true }
routes.post('/:friendId/approve', (req: Request, res: Response) => {
  return res.send().status(200);
});


// Method:        DELETE
// Summary:       deny user invitation
// Description:   remove friendRequest entry
// Permissions:   user
// Response:      { denied: true }
routes.delete('/:friendId/deny', (req: Request, res: Response) => {
  return res.send().status(200);
});

export default routes;
