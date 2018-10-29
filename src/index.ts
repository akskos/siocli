import IC from './InputController';

import Connection from './Connection';
import * as validators from './validators';

const ic = new IC();

const initSocketIOConnection = (): Connection | undefined => {
  try {
    const url = process.argv[2];
    return new Connection(url);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

(async () => {
  const conn = initSocketIOConnection();
  if (!conn) {
    return;
  }
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
})();
