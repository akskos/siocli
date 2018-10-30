import IC from './InputController';

import Connection from './Connection';
import * as validators from './validators';

const ic = new IC();

const printUsage = () => {
  console.error('Usage: siocli hostname[:port]');
};

const initSocketIOConnection = (): Connection => {
  const url = process.argv[2];
  return new Connection(url);
};

const mainLoop = async (conn: Connection) => {
  while (true) {
    const input = await ic.input('> ');
    const args = input.split(' ');
    const cmd = args[0];
    const event = args[1];
    switch (cmd) {
    case 'emit':
      const payload = args[2];
      conn.emit(event, payload);
      break;
    case 'listen':
      conn.listen(event);
      break;
    default:
      console.log(`unknown command: ${cmd}`);
      break;
    }
  }
};

try {
  const conn = initSocketIOConnection();
  mainLoop(conn);
} catch (error) {
  if (error.message === 'invalid usage') {
    printUsage();
  } else {
    console.error(error);
  }
  process.exit(1);
}
