import io from 'socket.io-client';
import IC from './InputController';

const ic = new IC();

const commands = [
  'emit',
  'listen',
  'quit',
];

const quitWithUsage = () => {
  console.error('Usage: siocli hostname[:port]');
  process.exit(1);
};

const registerDefaultEvents = (conn: SocketIOClient.Socket) => {
  conn.on('error', (error: string) => {
    console.error(error);
  });
  conn.on('connect', () => {
    console.log('connected successfully');
  });
};

const initSocketIOConnection = () => {
  const host = process.argv[2];
  if (!host) {
    quitWithUsage();
  }
  if (!host.match(/^(ws:\/\/)?([a-z]+\.)*([a-z]+)(:[0-9]+)?\/?$/i)) {
    quitWithUsage();
  }
  const conn = io(host);
  registerDefaultEvents(conn);
  return conn;
};

(async () => {
  const conn = initSocketIOConnection();
  while (true) {
    const cmd = await ic.input('> ');
    switch (cmd) {
    case 'emit':
      console.log('EMIIITT');
      break;
    default:
      console.log(`unknown command: ${cmd}`);
      break;
    }
  }
})();
