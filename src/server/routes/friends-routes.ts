import {Router, Request, Response} from 'express';
import {isNil} from 'lodash';
import {ResponseCodes} from "../util/response-codes";
import {User} from "../models";

// COMMON PATH - /user/userId:/friends/

const routes = Router({mergeParams: true});


// Method:        GET
// Summary:       get friends and friend requests
// Permissions:   user
// Response:      { friends, requests }
routes.get('/', async (req: Request, res: Response) => {

  const {userId} = req.params as {
    userId: string;
  };

  if (isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {

    const user = await User
      .findById(userId)
      .populate('friends')
      .populate('friendRequests');

    if (isNil(user)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    // @ts-ignore
    const friends = await user.friends.map((el) => el.username)
    // @ts-ignore
    const requests = await user.friendRequests.map((el) => el.username)

    return res.status(ResponseCodes.OK).send({
      friends,
      requests,
    });

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }

});


// Method:        POST
// Summary:       invite friend
// Description:   add entry to friendRequests, notify person
// Permissions:   user
routes.post('/:friendUsername/invite', async (req: Request, res: Response) => {

  const {friendUsername, userId} = req.params as {
    friendUsername: string;
    userId: string;
  };

  if (isNil(friendUsername) || isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if (isNil(user) || isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    if (user._id === friend._id) {
      return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
    }

    // @ts-ignore
    if (friend.friendRequests.includes(user._id) || friend.friends.includes(user._id)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }
    // @ts-ignore
    friend.friendRequests.push(user._id);
    // @ts-ignore
    await friend.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }

});


// Method:        DELETE
// Summary:       delete person from user friendList
// Description:
// Permissions:   user
// Response:      { deleted: true }
routes.delete('/:friendUsername', async (req: Request, res: Response) => {

  const {friendUsername, userId} = req.params as {
    friendUsername: string;
    userId: string;
  };

  if (isNil(friendUsername) || isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if (isNil(user) || isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    // @ts-ignore
    if (!user.friends.includes(friend._id)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }
    // @ts-ignore
    user.friends.pull(friend._id);
    // @ts-ignore
    friend.friends.pull(user._id);
    await user.save();
    // @ts-ignore
    await friend.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }

});


// Method:        POST
// Summary:       accept user invitation
// Description:   remove friendRequest entry, add person to friendList, notify friend
// Permissions:   user
// Response:      { approved: true }
routes.post('/:friendUsername/accept', async (req: Request, res: Response) => {

  const {friendUsername, userId} = req.params as {
    friendUsername: string;
    userId: string;
  };

  if (isNil(friendUsername) || isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if (isNil(user) || isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    // @ts-ignore
    if (!user.friendRequests.includes(friend._id)  || user.friends.includes(friend._id)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }
    // @ts-ignore
    user.friendRequests.pull(friend._id);
    // @ts-ignore
    user.friends.push(friend._id);
    // @ts-ignore
    friend.friends.push(user._id);

    await user.save();
    // @ts-ignore
    await friend.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }

});


// Method:        DELETE
// Summary:       deny user invitation
// Description:   remove friendRequest entry
// Permissions:   user
// Response:      { denied: true }
routes.delete('/:friendUsername/deny', async (req: Request, res: Response) => {

  const {friendUsername, userId} = req.params as {
    friendUsername: string;
    userId: string;
  };

  if (isNil(friendUsername) || isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if (isNil(user) || isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    // @ts-ignore
    if (!user.friendRequests.includes(friend._id) || user.friends.includes(friend._id)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }
    // @ts-ignore
    user.friendRequests.pull(friend._id);
    await user.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }

});

export default routes;
