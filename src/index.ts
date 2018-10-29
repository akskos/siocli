import IC from './InputController';

import Connection from './Connection';

const ic = new IC();

const initSocketIOConnection = () => {
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
