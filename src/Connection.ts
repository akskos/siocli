import io from 'socket.io-client';

const isWSUrl = /^(ws:\/\/)?([a-z]+\.)*([a-z]+)(:[0-9]+)?\/?$/i;

export default class Connection {
  private conn: SocketIOClient.Socket;

  constructor(host: string) {
    if (!host) {
      throw this.usage();
    }
    if (!host.match(isWSUrl)) {
      throw this.usage();
    }
    this.conn = io(host);
    this.registerDefaultEvents();
  }

  public listen(event: string, cb: (payload: string) => undefined) {
    if (cb) {
      this.conn.on(event, cb);
    } else {
      this.conn.on(event, (payload: string) => {
        console.log(payload);
      });
    }
  }

  public emit(event: string, payload: any) {
    this.conn.emit(event, payload);
  }

  private usage() {
    return 'Usage: siocli hostname[:port]';
  }

  private registerDefaultEvents() {
    this.conn.on('error', (error: string) => {
      console.error(error);
    });
    this.conn.on('connect', () => {
      console.log('connected successfully');
    });
  }
}
