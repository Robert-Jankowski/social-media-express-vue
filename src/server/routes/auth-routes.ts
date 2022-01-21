import {Router, Request, Response} from 'express';
import {isNil} from 'lodash';
import {ResponseCodes} from "../util/response-codes";
import {User} from "../models";
import passport from "passport";

// COMMON PATH - /user

const routes = Router();

// Method:        POST
// Summary:       login to account
// Description:   if login and password are correct then create session for user
// Permissions:   anyone
// Body:          { login, password }
routes.post(
  '/login',
  passport.authenticate('local', {}), (req, res) => {

  return res
    .status(ResponseCodes.OK)
    .send({
      user: {
        // @ts-ignore
        username: req.user.login,
        // @ts-ignore
        id: req.user.id,
    }})
});


// Method:        POST
// Summary:       logout
// Description:   delete session
// Permissions:   user
// Response:      { loggedOut: true }
routes.post('/logout', (req: Request, res: Response) => {
  req.logout();
  return res.status(ResponseCodes.OK).send({ loggedOut: true });
});


// Method:        POST
// Summary:       register new account
// Description:   if login is not occupied create account. if username not provided use login
// Permissions:   anyone
// Body:          { login, password, username? }
// Response:      { userId }
routes.post('/register', async (req: Request, res: Response) => {

  try {

    const {login, password, username} = req.body as {
      login: string;
      password: string;
      username?: string;
    }

    if (isNil(login) || isNil(password)) {
      return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
    }

    if (await User.exists({login})) {
      return res.sendStatus(ResponseCodes.ALREADY_EXIST);
    }

    const newUser = new User({
      login,
      password,
      username: username ?? login,
      friends: [],
      friendRequests: [],
      posts: [],
    })

    const saved = await newUser.save();

    return res
      .status(ResponseCodes.CREATED)
      .send({
        user: {
          id: saved._id,
          username: saved.login,
        }
      });

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
});

export default routes;
