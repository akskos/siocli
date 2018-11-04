import SocketIOClient from 'socket.io-client';

import CommandParser from './CommandParser';
import container from './container';

export type Commands = Map<string, (args: string) => void>;

export default () => {
  const io: SocketIOClient.Socket = container.resolve<SocketIOClient.Socket>('io');
  const commandParser: CommandParser = container.resolve('commandParser');

  const commands = new Map<string, (args: string) => void>();
  commands.set('emit', (args: string) => {
    const [ event, payload ] = commandParser.parse(args.trim(), '%w %w');
    console.log(event);
    console.log(payload);
  });
  return commands;
};
