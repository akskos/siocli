import { Commands } from './commands';
import InputController from './InputController';

export default class Main {
  private ic: InputController;
  constructor(
    inputController: InputController,
    private commands: Commands) {
    this.ic = inputController;
  }

  public async start() {
    await this.cliUiLoop();
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
