import expressSession, {Store} from 'express-session';

interface SessionMiddlewareWrapperInput {
  store: Store;
  secret: string;
}

export const sessionMiddlewareWrapper = ({store, secret}: SessionMiddlewareWrapperInput) =>
  expressSession({
    secret,
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
    unset: "destroy",
  });
