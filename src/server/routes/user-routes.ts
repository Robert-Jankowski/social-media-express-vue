import {Router, Request, Response} from 'express';
import {userAuthorization} from "../util/auth-utils";
import {ResponseCodes} from "../util/response-codes";
import {Post, User} from "../models";
import {isNil} from 'lodash';
import {PostTypes, WallTypes} from "../types/enums";

// COMMON PATH - /user

const routes = Router({mergeParams: true});

// Method:        GET
// Summary:       get user profile data
// Response:      { ...userData }
routes.get('/:username', userAuthorization, async (req: Request, res: Response) => {

  const { username } = req.params as {
    username: string;
  };

  try {
    const user = await User.find({username});

    if (isNil(user)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send()
    }

    // TODO - figure out returned data
    return res.status(ResponseCodes.OK).send({
      ...{
        some: 'data',
      },
    });
  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
});

// Method:        POST
// Summary:       add new post
// Permissions:   logged
// Body:          {title, content, type}
// Response:      { postId }
routes.post('/:userId', async (req: Request, res: Response) => {

  const {title, content, type} = req.body as {
    title: string;
    content: string;
    type: string;
  };

  // @ts-ignore
  const sessionUserId = req?.user?._id?.toString();
  const userId = req.params?.userId;

  if ( isNil(userId) || isNil(sessionUserId) || sessionUserId !== userId) {
    return res
      .status(ResponseCodes.UNAUTHORIZED)
      .send()
  }

  try {

    const user = await User.findById(userId);

    if (isNil(user)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send()
    }

    if (type === PostTypes.PRIVATE || type === PostTypes.PUBLIC) {

      const newPost = new Post({
        title,
        content,
        author: userId,
        type,
      });

      await newPost.save();

      return res
        .status(ResponseCodes.OK)
        .send({
          isPrivate: type === PostTypes.PRIVATE,
        });
    }

    const privatePost = new Post({
      title,
      content,
      author: userId,
      type: PostTypes.PRIVATE,
    })

    const publicPost = new Post({
      title,
      content,
      author: userId,
      type: PostTypes.PUBLIC,
    })

    await privatePost.save();
    await publicPost.save();

    return res
      .status(ResponseCodes.OK)
      .send({
        isPrivate: true, // TODO - think what to do here
      });


  }
  catch (error) {
    return res
      .sendStatus(ResponseCodes.INTERNAL_ERROR)
  }
});


// Method:        PATCH
// Summary:       edit user data
// Description:
// Permissions:   user
// Body:          { ...userData }
// Response:      { ...userData }
routes.patch('/:id', userAuthorization, async (req: Request, res: Response) => {

  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  const { id: userId } = req.params as {
    id: string;
  };

  return res.send().status(200);
});

export default routes;
