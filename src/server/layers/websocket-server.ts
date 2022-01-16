import { Server } from "socket.io";
import { RequestHandler } from "express";

interface WrapperInput {
  sessionMiddleware: RequestHandler;
}

export const websocketServerWrapper = ({sessionMiddleware}: WrapperInput) => {

  const io = new Server();

  io.use(websocketMiddlewareWrapper(sessionMiddleware));

  io.on("connection", socket => {

    console.log('connected');

    socket.on('disconnect', () => {
      console.log('disconnected');
      socket.disconnect();
    });
  });


  return io;
}

// @ts-ignore
const websocketMiddlewareWrapper = (middleware) => (socket, next) => {
  middleware(socket.request, {}, next);
};
