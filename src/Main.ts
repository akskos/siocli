import Connection from './Connection';
import * as validators from './validators';
import { Commands } from './commands';
import InputController from './InputController';
import Config from './Config';

export default class Main {
  private ic: InputController;
  private conn: Connection;
  constructor(
    inputController: InputController,
    private config: Config,
    private commands: Commands) {
    this.ic = inputController;
    this.conn = this.initSocketIOConnection();
  }

  public async start() {
    await this.cliUiLoop();
  }

  private initSocketIOConnection() {
    const url = this.config.url;
    return new Connection(url);
  }

  private async cliUiLoop() {
    while (true) {
      const input = await this.ic.input('> ');
      const commandName = input.split(' ')[0];
      const spaceIndex = input.indexOf(' ');
      const args = input.slice(spaceIndex);
      const command = this.commands.get(commandName);
      if (!command) {
        console.error('unknown command:', commandName);
        continue;
      }
      command(args);
    }
  }
}
