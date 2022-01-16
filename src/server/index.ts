import {Express, RequestHandler} from "express";
import {expressAppWrapper, httpsServerWrapper, mongoStoreWrapper, websocketServerWrapper} from "./layers";
import {sessionMiddlewareWrapper} from "./middleware";
import {Server as WebsocketServer} from "socket.io";
import {Server as HttpsServer} from "https";
import CONFIG from "./config";
import {Server} from "http";

// MONGO STORE
const mongoStore = mongoStoreWrapper({
  port: CONFIG.MONGO_PORT,
  host: CONFIG.MONGO_HOST,
  dbName: CONFIG.MONGO_DB_NAME,
})

// MIDDLEWARE SESJI
const sessionMiddleware: RequestHandler = sessionMiddlewareWrapper({
  store: mongoStore,
  secret: CONFIG.SESSION_OPTIONS.SECRET,
});

// APLIKACJA EXPRESS
const app: Express = expressAppWrapper({
  uiFilesDirectory: CONFIG.UI_DIR,
  sessionMiddleware,
})

// SERWER HTTPS
const server: HttpsServer = httpsServerWrapper({
  app,
  options: CONFIG.SERVER_OPTIONS,
  port: CONFIG.APP_PORT,
})

// SERWER WEBSOCKET
const io: WebsocketServer = websocketServerWrapper({
  sessionMiddleware,
});


io.attach(server as Server);
app.set('socketio', io);
