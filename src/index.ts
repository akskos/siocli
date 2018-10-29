import IC from './InputController';

const ic = new IC();

const commands = [
    'emit',
    'listen',
    'quit',
];

let getSuggestion = (partialInput: string): string | undefined => { return '' };
let returnFunc = (result: any) => {};
let inputString = '';

(async function() {
    while (true) {
        const cmd = await ic.input('> ');
        switch (cmd) {
            case 'emit':
                console.log('EMIIITT');
                break;
            default:
                console.log(`unknown command: ${cmd}`);
                break;
        }
    }
})();