import fs from "fs";
import dotenv from 'dotenv';
import { ServerOptions } from "https";
import { ConnectOptions } from "mongoose";
import { AppConfiguration } from "../types/app-configuration";

dotenv.config();

const MONGO_PORT = process.env.MONGO_PORT ?? '27017';
const MONGO_HOST = process.env.MONGO_HOST ?? '127.0.0.1';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME ?? 'project';
const MONGO_OPTIONS: ConnectOptions = { };

const APP_PORT = process.env.APP_PORT ?? '8080';
const APP_HOST = process.env.APP_HOST ?? 'localhost';

const JWT_SECRET = process.env.JTW_SECRET ?? 'd664fe909982184cc1bf37d18bc0f0c139c3fe46d3969a7ab13283d9b7abb3b2';
const JWT_OPTIONS = { expiresIn: '3600s' };

const UI_DIR = process.env.UI_DIR ?? 'dist';
const SERVER_OPTIONS: ServerOptions = {
  key: fs.readFileSync(`./ssl/${process.env.SSL_KEY_FILE ?? 'my.key'}`),
  cert: fs.readFileSync(`./ssl/${process.env.SSL_CERT_FILE ?? 'my.crt'}`),
};

const configurationObject: AppConfiguration = {
  MONGO_PORT,
  MONGO_HOST,
  MONGO_DB_NAME,
  MONGO_OPTIONS,
  APP_PORT,
  APP_HOST,
  JWT_SECRET,
  JWT_OPTIONS,
  SERVER_OPTIONS,
  UI_DIR,
}

export default configurationObject;
