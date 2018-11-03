import SocketIOClient from 'socket.io-client';

export interface Command {
  execute(payload: any): void;
}

export class EmitCommand implements Command {
  constructor(private io: SocketIOClient.Socket) { }

  public execute(payload: any) {
    this.io.emit(payload);
  }
}
