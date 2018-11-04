import * as awilix from 'awilix';
import io from 'socket.io-client';
import CommandParser from './CommandParser';
import Config from './Config';
import InputController from './InputController';
import Main from './Main';
import commands from './commands';

const container = awilix.createContainer({
  injectionMode: 'CLASSIC',
});

function makeSocketIOClient() {
  const config = container.resolve<Config>('config');
  return io(config.url);
}

function makeCommands() {
  return commands();
}

container.register('io', awilix.asFunction(makeSocketIOClient));
container.register('commandParser', awilix.asClass(CommandParser));
container.register('config', awilix.asClass(Config));
container.register('inputController', awilix.asClass(InputController));
container.register('main', awilix.asClass(Main));
container.register('commands', awilix.asFunction(makeCommands));

export default container;
