import Tag from './Tag';

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

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

class Form {
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
    this.template.submit = name;
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
      switch (input?.options?.as) {
        case 'textarea': {
          return [
            new Tag(
              'label',
              {
                for: input.name,
              },
              capitalizeFirstLetter(input.name),
            ).toString(),
            new Tag(
              'textarea',
              {
                name: input.name,
                ...input.options,
              },
              this.template[input.name],
            ).toString(),
          ].join('');
        }
        case 'submit': {
          return new Tag('input', {
            value: input.name,
            type: 'submit',
          }).toString();
        }
        default: {
          return [
            new Tag(
              'label',
              {
                for: input.name,
              },
              capitalizeFirstLetter(input.name),
            ).toString(),
            new Tag(
              'input',
              {
                value: this.template[input.name],
                type: 'text',
                name: input.name,
                ...input.options,
              },
            ).toString(),
          ].join('');
        }
      }
    }).join('');

    return new Tag('form', tagOptions, children).toString();
  }
}

export default Form;
