import express, {RequestHandler} from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportLocal from 'passport-local';
import cors from 'cors';
import routes from '../routes';
import {userDeserializer, userSerializer, verifyUser} from "../util/auth-utils";

interface WrapperInput {
  uiFilesDirectory: string;
  sessionMiddleware: RequestHandler;
}

export const expressAppWrapper = ({uiFilesDirectory, sessionMiddleware}: WrapperInput) => {

  const app = express();
  app.use(cors())
  app.use(express.static(uiFilesDirectory));
  app.use(express.json());
  app.use(cookieParser());

  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new passportLocal.Strategy({
    usernameField: 'login',
    passwordField: 'password',
  }, verifyUser));
  passport.serializeUser(userSerializer);
  passport.deserializeUser(userDeserializer);

  app.use(express.urlencoded({
    extended: false,
  }));

  app.use('/api', routes);


  return app;
}
