import Tag, { TagOptions } from './Tag';

type FormOptions = {
  url?: string;
};

type InputOptions = Record<string, string | number>;

type Input = {
  name: string;
  options?: InputOptions;
};

type Template = Record<string, string>;

type Callback = (form: Form) => void;

const DEFAULT_SUBMIT_BUTTON_TEXT = 'Save';

export default class Form {
  static formFor(
    template: Template,
    options?: FormOptions,
    callback?: Callback,
  ): string {
    return new Form(template, options, callback).toString();
  }

  private inputs: Input[] = [];

  constructor(
    private template: Template,
    private options?: FormOptions,
    private callback?: Callback,
  ) {}

  input(name: string, options?: InputOptions): void {
    if (name in this.template) {
      this.inputs.push({ name, options });
    } else {
      throw new Error(`Error: Field ${name} does not exist in the template.`);
    }
  }

  submit(name: string = DEFAULT_SUBMIT_BUTTON_TEXT): void {
    this.inputs.push({ name, options: { as: 'submit' } });
    this.template['submit'] = name;
  }

  toString(): string {
    if (this.callback) {
      this.callback(this);
    }

    const tagOptions = {
      method: 'post',
      action: this.options?.url ?? '#',
    };

    if (this.inputs.length === 0) {
      return new Tag('form', tagOptions).toString();
    }

    const children: string = this.inputs.map((input: Input) => {
      const options: TagOptions = {
        ...input.options,
      };

      let name: string = 'input';
      let innerText: string = '';

      switch (input?.options?.as) {
        case 'textarea': {
          name = 'textarea';
          innerText = this.template[input.name];
          options.name = input.name;
          break;
        }
        case 'submit': {
          options.value = input.name;
          options.type = 'submit';
          delete options.as;
          break;
        }
        default: {
          options.value = this.template[input.name];
          options.type = 'text';
          options.name = input.name;
          break;
        }
      }

      return new Tag(name, options, innerText).toString();
    }).join('');

    return new Tag('form', tagOptions, children).toString();
  }
}
