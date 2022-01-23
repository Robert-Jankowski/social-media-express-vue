import {Router, Request, Response} from 'express';
import {isNil} from 'lodash';
import {ResponseCodes} from "../util/response-codes";
import {User} from "../models";
import passport from "passport";
import {ErrorMessages} from "../types/error-messages";

// COMMON PATH - /user

const routes = Router({mergeParams: true});

// Method:        POST
// Summary:       login to account
// Description:   if username and password are correct then create session for user
// Permissions:   anyone
// Body:          { username, password }
routes.post(
  '/login',
  passport.authenticate('local', {}), (req, res) => {

  return res
    .status(ResponseCodes.OK)
    .send({
      user: {
        // @ts-ignore
        username: req.user.username,
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
// Description:   if username is not occupied create account. if username not provided use login
// Permissions:   anyone
// Body:          { username, password,  }
// Response:      { userId }
routes.post('/register', async (req: Request, res: Response) => {

  try {

    const { password, username } = req.body as {
      username: string;
      password: string;
    }

    if (isNil(username) || isNil(password)) {
      return res
        .status(ResponseCodes.WRONG_BODY_CONTENT)
        .send(ErrorMessages.WRONG_BODY_CONTENT);
    }

    if (await User.exists({username})) {
      return res
        .status(ResponseCodes.ALREADY_EXIST)
        .send(ErrorMessages.USER_ALREADY_EXISTS);
    }

    const newUser = new User({
      username,
      password,
      friends: [],
      friendRequests: [],
      tags: [],
    })

    const saved = await newUser.save();

    return res
      .status(ResponseCodes.CREATED)
      .send({
        user: {
          id: saved._id,
          username: saved.username,
        }
      });

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send(ErrorMessages.INTERNAL_ERROR)
  }
});

export default routes;
