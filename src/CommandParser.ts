export default class CommandParser {
  public parse(args: string, format: string): any[] {
    if (!this.validateFormat(format)) {
      throw new Error(`invalid command argument format: ${format}`);
    }
    const fieldFormats = format.split(' ');
    return this.parseFields(args, fieldFormats);
  }

  private parseFields(args: string | null, formats: string[]): any[] {
    if (!args) {
      return [];
    }
    const f = formats[0];
    let parsedFields: any[] = [];
    switch (f) {
    case '%w':
      const result = this.parseWord(args);
      console.log(result.word);
      parsedFields.push(result.word);
      if (formats.length > 1) {
        parsedFields = parsedFields.concat(this.parseFields(result.args, formats.slice(1)));
      }
      break;
    default:
      break;
    }
    return parsedFields;
  }

  private parseWord(args: string): { args: string | null, word: string } {
    const words = args.split(' ').filter((w) => w.length > 0);
    const spaceIndex = args.indexOf(' ');
    let restOfArgs = null;
    if (spaceIndex !== -1) {
      restOfArgs = args.slice(spaceIndex).trim();
    }
    return {
      args: restOfArgs,
      word: words[0],
    };
  }

  private validateFormat(format: string) {
    return format.match(/^(%[wod] )*(%[wod])$/);
  }
}
