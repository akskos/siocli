import keypress from 'keypress';
import readline from 'readline';

// TODO: would benefit from some refactoring
export default class InputController {
  private stdin: NodeJS.ReadStream;
  private stdout: NodeJS.WriteStream;
  private inputString: string;
  private promptLine: string;
  private returnFunc: (input: string) => void;
  private columnDistance: number;

  constructor() {
    this.stdin = process.stdin;
    this.stdout = process.stdout;
    this.inputString = '';
    this.promptLine = '';
    keypress(process.stdin);
    this.initializeKeypressHandler();
    this.returnFunc = (asdf: string) => undefined;
    this.columnDistance = 0;
  }

  public input(prompt: string): Promise<string> {
    this.inputString = '';
    this.promptLine = prompt;
    this.stdout.write(prompt);
    return new Promise((resolve) => {
      this.returnFunc = (input: string) => {
        resolve(input);
      };
    });
  }

  private activateRawStdin() {
    if (this.stdin.setRawMode) {
      this.stdin.setRawMode(true);
    }
  }

  private initializeKeypressHandler = () => {
    this.activateRawStdin();
    this.stdin.on('keypress', (ch, key) => {
      if (key.name === 'return') {
        this.stdout.write('\n');
        this.columnDistance = 0;
        this.returnFunc(this.inputString);
        return;
      } else if (key.name === 'backspace') {
        if (this.inputString.length > 1) {
          this.inputString = this.inputString.substr(0, this.inputString.length - 1);
        } else {
          this.inputString = '';
        }
        if (this.columnDistance > 0) {
          this.columnDistance--;
          readline.moveCursor(this.stdout, -1, 0);
        }
      } else if (ch >= ' ' && ch <= '~') {
        this.inputString += ch;
        this.columnDistance++;
      }
      if (key.ctrl && (key.name === 'c' || key.name === 'd')) {
        this.stdout.write('\n');
        process.exit();
      }
      readline.clearLine(this.stdout, 0);
      readline.moveCursor(this.stdout, -this.columnDistance - this.promptLine.length, 0);
      this.stdout.write(`${this.promptLine}${this.inputString}`);
    });
  }
}
