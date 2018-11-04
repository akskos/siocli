import * as awilix from 'awilix';
import io from 'socket.io-client';
import CommandParser from './CommandParser';

const container = awilix.createContainer({
  injectionMode: 'CLASSIC',
});

function makeSocketIOClient() {
  return io('localhost:6666');
}

container.register('io', awilix.asFunction(makeSocketIOClient));
container.register('commandParser', awilix.asClass(CommandParser));

export default container;
