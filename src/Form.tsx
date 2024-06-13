import Tag from './Tag';

export default class Form {
    static formFor(template: Record<string, string>, options: { url?: string }): string {
        const tagOptions = {
            method: 'post',
            action: options.url ?? '#',
        }
        return new Tag('form', tagOptions).toString();
    }
}
