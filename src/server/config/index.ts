import fs from "fs";
import dotenv from 'dotenv';
import { ServerOptions } from "https";

dotenv.config();

const MONGO_PORT = process.env.MONGO_PORT ?? '27017';
const MONGO_HOST = process.env.MONGO_HOST ?? '127.0.0.1';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME ?? 'project';

const APP_PORT = process.env.APP_PORT ?? '8080';
const APP_HOST = process.env.APP_HOST ?? 'localhost';

const SESSION_OPTIONS = {
  SECRET: process.env.SESSION_SECRET ?? 'secret',
};
const UI_DIR = process.env.UI_DIR ?? 'dist';
const SERVER_OPTIONS: ServerOptions = {
  key: fs.readFileSync(`./ssl/${process.env.SSL_KEY_FILE ?? 'my.key'}`),
  cert: fs.readFileSync(`./ssl/${process.env.SSL_CERT_FILE ?? 'my.crt'}`),
};

export default {
  MONGO_PORT,
  MONGO_HOST,
  MONGO_DB_NAME,
  APP_PORT,
  APP_HOST,
  SESSION_OPTIONS,
  SERVER_OPTIONS,
  UI_DIR,
}
