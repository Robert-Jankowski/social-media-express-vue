import {ConnectOptions} from "mongoose";
import {SignOptions} from "jsonwebtoken";
import {ServerOptions} from "https";

export interface AppConfiguration {
  MONGO_PORT: string;
  MONGO_HOST: string;
  MONGO_DB_NAME: string;
  MONGO_OPTIONS: ConnectOptions;
  APP_PORT: string;
  APP_HOST: string;
  JWT_SECRET: string;
  JWT_OPTIONS: SignOptions;
  SERVER_OPTIONS: ServerOptions;
  UI_DIR: string;
}
