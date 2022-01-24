import { Server } from "socket.io";
import { RequestHandler } from "express";

interface WrapperInput {
  sessionMiddleware: RequestHandler;
}

export const websocketServerWrapper = ({sessionMiddleware}: WrapperInput) => {

  const io = new Server({
    cors: {
      origin: '*',
    }
  });

  io.use(websocketMiddlewareWrapper(sessionMiddleware));

  io.on("connection", socket => {
    socket.on('disconnect', () => {
      socket.disconnect();
    });
  });


  return io;
}

// @ts-ignore
const websocketMiddlewareWrapper = (middleware) => (socket, next) => {
  middleware(socket.request, {}, next);
};
