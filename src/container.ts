import awilix from 'awilix';
import io from 'socket.io-client';

const container = awilix.createContainer({
  injectionMode: 'CLASSIC',
});

function makeSocketIOClient() {
  return io('localhost:6666');
}

container.register('io', awilix.asFunction(makeSocketIOClient));

export default container;
