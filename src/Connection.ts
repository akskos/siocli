import io from 'socket.io-client';

export default class Connection {
  private conn: SocketIOClient.Socket;

  constructor(host: string) {
    const url = this.resolveUrl(host);
    this.conn = io(url);
    this.registerDefaultEvents();
  }

  public listen(event: string, cb?: (payload: string) => undefined) {
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

  private registerDefaultEvents() {
    this.conn.on('error', (error: string) => {
      console.error(error);
    });
    this.conn.on('connect', () => {
      console.log('connected successfully');
    });
  }

  private resolveUrl(inputUrl: string) {
    const isWSUrl = /^(ws:\/\/)([a-z]+\.)*([a-z]+)(:[0-9]+)?\/?$/i;
    const invalidUsage = new Error('invalid usage');
    if (!inputUrl) {
      throw invalidUsage;
    }
    if (inputUrl.match(isWSUrl)) {
      return inputUrl;
    } else if (`ws://${inputUrl}`.match(isWSUrl)) {
      return `ws://${inputUrl}`;
    } else {
      throw invalidUsage;
    }
  }
}
