import {Router, Request, Response} from 'express';
import {userAuthorization} from "../util/auth-utils";
import {ResponseCodes} from "../util/response-codes";
import {Post, User} from "../models";
import {isNil} from 'lodash';
import {PostTypes, WallTypes} from "../types/enums";
import {UserDefinition} from "../types/model-types";

// COMMON PATH - /user

const routes = Router({mergeParams: true});

// Method:        GET
// Summary:       get user profile data
// Response:      { ...userData }
routes.get('/:username', async (req: Request, res: Response) => {

  const { username } = req.params as {
    username: string;
  };

  try {
    // @ts-ignore
    const user = await User.findOne({username}) as UserDefinition;

    if (isNil(user)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send()
    }

    return res.status(ResponseCodes.OK)
      .send({
        username: user.username,
        description: user.description,
        status: user.status,
        realName: user.realName,
        tags: user.tags,
        imageUrl: user.imageUrl,
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
routes.post('/:userId', userAuthorization, async (req: Request, res: Response) => {

  const io = req.app.get('socketio');

  const {title, content, type} = req.body as {
    title: string;
    content: string;
    type: string;
  };

  // @ts-ignore
  const userId = req.params?.userId;

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

      const savedPost = await newPost.save();

      io.emit(`wall/${user.username}/${savedPost.type}`, {
        id: savedPost.id,
        title: savedPost.title,
        content: savedPost.content,
        author: user.username,
        comments: [],
      })

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

    const savedPrivatePost = await privatePost.save();
    const savedPublicPost = await publicPost.save();

    io.emit(`wall/${user.username}/${savedPrivatePost.type}`, {
      id: savedPrivatePost.id,
      title: savedPrivatePost.title,
      content: savedPrivatePost.content,
      author: user.username,
      comments: [],
    })

    io.emit(`wall/${user.username}/${savedPublicPost.type}`, {
      id: savedPublicPost.id,
      title: savedPublicPost.title,
      content: savedPublicPost.content,
      author: user.username,
      comments: [],
    })

    return res
      .status(ResponseCodes.OK)
      .send({
        isPrivate: true,
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
routes.put('/:userId', userAuthorization, async (req: Request, res: Response) => {

  const { realName, status, description, tags, imageUrl } = req.body as {
    realName: string;
    status: string;
    description: string;
    tags: string[];
    imageUrl: string;
  };

  const userId = req.params.userId;

  if (isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  const user = await User.findById(userId);

  if (isNil(user)) {
    return res.sendStatus(ResponseCodes.NOT_FOUND);
  }

  user.realName = realName;
  user.status = status;
  user.description = description;
  user.tags = tags ?? [];
  user.imageUrl = imageUrl;

  await user.save();

  return res.send().status(200);
});

export default routes;
