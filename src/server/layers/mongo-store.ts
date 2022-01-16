import expressSession from 'express-session';
import MongoDBStore from "connect-mongodb-session";

interface WrapperInput {
  port: string;
  host: string;
  dbName: string;
}

export const mongoStoreWrapper = ({ port, host, dbName}: WrapperInput) => {
  const MongoStore = MongoDBStore(expressSession);
  const mongoStore = new MongoStore({
    uri: `mongodb://${host}:${port}`,
    databaseName: dbName,
    collection: "sessions",
  });

  mongoStore.on('connection', () => {
    console.log('Connected to MongoDB');
  });

  mongoStore.on("error", (err) => {
    console.log("Error while connecting to MongoDB");
  });


  return mongoStore;
}
