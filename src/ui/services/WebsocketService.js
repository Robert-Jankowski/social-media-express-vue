import { io } from 'socket.io-client';

class WebsocketService {
  socket;
  port;
  host;
  constructor() {
    this.host = process.env.APP_HOST ?? 'localhost';
    this.port =  process.env.APP_PORT ?? 8080;
  }

  connect() {
    console.log(this.buildUrl())
    this.socket = io(this.buildUrl());
    this.socket.emit('my message', 'Hello there from Vue.');
    this.socket.on("connect", () => {
      console.log(`Connected to socket: ${this.socket.id}`);
    });
  }

  disconnect() {
    if (this.socket)
      console.log(`Disconnected from socket: ${this.socket.id}`);
      this.socket.disconnect();
    }

  buildUrl() {
    return `wss://${this.host}:${this.port}`;
  }
}

export default new WebsocketService();
