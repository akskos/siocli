import * as awilix from 'awilix';
import io from 'socket.io-client';
import CommandParser from './CommandParser';

import Config from './Config';

const container = awilix.createContainer({
  injectionMode: 'CLASSIC',
});

function makeSocketIOClient() {
  return io('localhost:6666');
}

container.register('io', awilix.asFunction(makeSocketIOClient));
container.register('commandParser', awilix.asClass(CommandParser));
container.register('config', awilix.asClass(Config));

export default container;
