import { io } from 'socket.io-client';

class WebsocketService {
  socket;
  constructor() {}

  connect() {
    this.socket = io('wss://localhost:8080');
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
}

export default new WebsocketService();
