export default class CommandParser {
  public parse(args: string, format: string): any[] {
    if (!this.validateFormat(format)) {
      throw new Error(`invalid command argument format: ${format}`);
    }
    const fieldFormats = format.split(' ');
    console.log(fieldFormats);
    return this.parseFields(args, fieldFormats);
  }

  private parseFields(args: string, formats: string[]): any[] {
    const f = formats[0];
    const parsedFields: any[] = [];
    switch (f) {
    case '%w':
      console.log('parsing', args);
      const result = this.parseWord(args);
      console.log('parsed:', result.word);
      parsedFields.push(result.word);
      if (formats.length > 1) {
        parsedFields.concat(this.parseFields(result.args, formats.slice(1)));
      }
      break;
    default:
      break;
    }
    return parsedFields;
  }

  private parseWord(args: string): { args: string, word: string } {
    const spaceIndex = args.indexOf(' ');
    const words = args.split(' ').filter((w) => w.length > 0);
    console.log('words', words);
    console.log('space index', spaceIndex);
    const restOfArgs = args.slice(spaceIndex);
    return {
      args: restOfArgs,
      word: words[0],
    };
  }

  private validateFormat(format: string) {
    return format.match(/^(%[wod] )*(%[wod])$/);
  }
}
