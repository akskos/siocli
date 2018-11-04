import SocketIOClient from 'socket.io-client';

import CommandParser from './CommandParser';
import container from './container';

const io: SocketIOClient.Socket = container.resolve('io');
const commandParser: CommandParser = container.resolve('commandParser');

const commands = new Map<string, (args: string) => void>();
commands.set('emit', (args: string) => {
  const [ event, payload ] = commandParser.parse(args.trim(), '%w %w');
  console.log(event);
  console.log(payload);
});

export default commands;
