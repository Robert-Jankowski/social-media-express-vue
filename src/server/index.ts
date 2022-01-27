import express, {Express} from 'express';
import {Server as WebsocketServer} from 'socket.io';
import {Server as HttpsServer} from 'https';
import { ServerOptions } from 'https';
import {Server} from 'http';
import mongoose, {ConnectOptions} from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import https from 'https';
import {AppConfiguration} from './types/app-configuration';
import CONFIG from './config';
import socketioJwt from 'socketio-jwt';

class ServerService {

  private readonly config: AppConfiguration;
  private readonly app: Express;
  private readonly server: HttpsServer;
  private readonly io: WebsocketServer;

  constructor(config: AppConfiguration) {

    this.config = config;

    this.connectToMongoDB(
      this.config.MONGO_HOST,
      this.config.MONGO_PORT,
      this.config.MONGO_DB_NAME,
      this.config.MONGO_OPTIONS);

    this.app = ServerService.buildApp(this.config.UI_DIR);
    this.server = ServerService.buildServer(this.app, this.config.SERVER_OPTIONS);
    this.io = ServerService.buildSocketServer(this.config.APP_HOST, this.config.APP_PORT);

    this.io.attach(this.server as Server);
    this.app.set('socketio', this.io);
  }

  listen() {
    this.server.listen(this.config.APP_PORT, () => {
      console.log(`HTTPS server available from: https://localhost:${this.config.APP_PORT}`);
    });
  }

  private static buildApp(uiFilesDir: string): Express {

    const app = express();
    app.use(cors({
      credentials: true,
      origin: [
        'https://localhost:8081', // dev
      ],
    }))
    app.use(express.static(uiFilesDir));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({
      extended: false,
    }));
    app.use('/api', routes);
    app.use('/*', express.static(uiFilesDir));

    return app;
  }

  private static buildServer(app: Express, serverOptions: ServerOptions): HttpsServer {
    return https.createServer(serverOptions, app);
  }

  private static buildSocketServer(host: string, port:string): WebsocketServer {

    const io = new WebsocketServer({
      cors: {
        origin: [
          'https://localhost:8081', // dev
        ],
      }
    });

    io.use(socketioJwt.authorize({
      secret: CONFIG.JWT_SECRET,
      handshake: true
    }));

    io.on("connection", (socket) => {
      socket.on('disconnect', () => {
        socket.disconnect();
      });
    });

    return io;
  }

  private connectToMongoDB (host: string, port: string, dbName: string, options: ConnectOptions): void {
    mongoose
      .connect(
        `mongodb://${host}:${port}/${dbName}`,
        options,
        (_) => {
          console.log("Connected to mongoDB: " + `mongodb://${host}:${port}/${dbName}`);
        })
  }
}

const serverInstance = new ServerService(CONFIG);
serverInstance.listen();
