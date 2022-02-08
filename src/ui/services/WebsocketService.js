import {io} from 'socket.io-client';

class WebsocketService {
  socket;
  port;
  host;
  constructor() {
    this.host = process.env.APP_HOST ?? 'localhost';
    this.port = process.env.APP_PORT ?? 8080;
  }

  connect(logged) {
    this.socket = io(this.buildUrl(), this.getOptions(logged));
    this.socket.on("connect", () => {
      console.log(`Connected to ${logged ? 'secured' : 'public'} socket`, this.socket.id);
    });
    this.socket.on('unauthorized', (error) => {
      if (error.data.type === 'UnauthorizedError' || error.data.code === 'invalid_token') {
        console.log('User token has expired');
      }
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

  getOptions(logged) {

    return logged ?
      { path: '/socket.io/user', query: `token=${sessionStorage.getItem('microwall-jwt')}` } :
      { path: '/socket.io/guest'}
  }
}

export default WebsocketService;
