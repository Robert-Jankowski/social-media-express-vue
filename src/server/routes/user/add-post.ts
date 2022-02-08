import {Request, Response} from "express";
import {Post, User} from "../../models";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {PostTypes} from "../../types/post-types";

export const addPostHandler = async (req: Request, res: Response) => {

  const io = req.app.get('socketio');
  const guestIo = req.app.get('socketio-guest');

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

      if (savedPost.type === PostTypes.PUBLIC) {
        guestIo.emit(`wall/${user.username}/${PostTypes.PUBLIC}`, {
          id: savedPost.id,
          title: savedPost.title,
          content: savedPost.content,
          author: user.username,
          comments: [],
        })
      }

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
    });

    const publicPost = new Post({
      title,
      content,
      author: userId,
      type: PostTypes.PUBLIC,
    });

    const savedPrivatePost = await privatePost.save();
    const savedPublicPost = await publicPost.save();

    io.emit(`wall/${user.username}/${savedPrivatePost.type}`, {
      id: savedPrivatePost.id,
      title: savedPrivatePost.title,
      content: savedPrivatePost.content,
      author: user.username,
      comments: [],
    });

    io.emit(`wall/${user.username}/${savedPublicPost.type}`, {
      id: savedPublicPost.id,
      title: savedPublicPost.title,
      content: savedPublicPost.content,
      author: user.username,
      comments: [],
    });

    guestIo.emit(`wall/${user.username}/${PostTypes.PUBLIC}`, {
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
}
