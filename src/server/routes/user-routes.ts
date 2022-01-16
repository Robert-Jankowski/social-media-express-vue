import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/:id', (req: Request, res: Response) => {
  res.send({
    id: req.params.id,
    name: 'Jan',
    surname: 'Kowalski',
    yob: '2000-12-13'
  });
});

export default routes;
