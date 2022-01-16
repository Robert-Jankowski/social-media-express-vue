import {Express} from "express";
import * as https from "https";
import {ServerOptions} from "https";

interface WrapperParams {
  app: Express;
  options: ServerOptions;
  port: string;
}

export const httpsServerWrapper = ({ app, options, port }: WrapperParams) => {

  const server = https.createServer(options, app);

  server.listen(port, () => {
    console.log(`HTTPS server available from: https://localhost:${port}`);
  });

  return server;
}
