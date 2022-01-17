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
// Response:      { userId } - create session
routes.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/',
  failureMessage: true,
}));


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
// Description:   if login is not occupied create account
// Permissions:   anyone
// Body:          { login, password }
// Response:      { userId }
routes.post('/register', async (req: Request, res: Response) => {

  try {

    const {login, password} = req.body as {
      login: string;
      password: string;
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
      friends: [],
      friendRequests: [],
      messages: [],
      posts: [],
    })

    const saved = await newUser.save();

    return res
      .status(ResponseCodes.CREATED)
      .send(saved._id);

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
});

export default routes;
