import CommandParser from './CommandParser';
import container from './container';
import Connection from './Connection';

export type Commands = Map<string, (args: string) => void>;

export default () => {
  const io: Connection = container.resolve<Connection>('io');
  const commandParser: CommandParser = container.resolve('commandParser');

  const commands = new Map<string, (args: string) => void>();
  commands.set('emit', (args: string) => {
    const [ event, payload ] = commandParser.parse(args.trim(), '%w %w');
    io.emit(event, payload);
  });
  return commands;
};
