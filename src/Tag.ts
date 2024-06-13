const SINGLE_TAGS: string[] = ['input', 'img', 'br'];

export type TagOptions = Record<string, string | number>;

export default class Tag {
  constructor(
    private name: string,
    private options?: TagOptions,
    private children?: string,
  ) {}

  toString(): string {
    let result = `<${this.name}`;

    if (this.options) {
      const options = Object
        .entries(this.options)
        .map(([key, value]: [string, string | number]) => `${key}="${value}"`)
        .join(' ');
      result += ' ';
      result += options;
    }

    result += '>';

    if (SINGLE_TAGS.includes(this.name)) {
      return result;
    }

    if (this.children) {
      result += this.children;
    }

    result += `</${this.name}>`;

    return result;
  }
}
