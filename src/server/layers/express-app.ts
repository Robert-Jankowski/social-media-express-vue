import express, {RequestHandler} from "express";
import routes from '../routes';

interface WrapperInput {
  uiFilesDirectory: string;
  sessionMiddleware: RequestHandler;
}

export const expressAppWrapper = ({uiFilesDirectory, sessionMiddleware}: WrapperInput) => {
  const app = express();
  app.use(express.static(uiFilesDirectory));
  app.use(express.json());

  app.use(express.urlencoded({
    extended: false,
  }));

  app.use(sessionMiddleware);

  app.use('/api', routes);


  return app;
}
