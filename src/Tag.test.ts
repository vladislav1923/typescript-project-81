import Tag from "./Tag";

describe('Class Tag', () => {
    it('should generate html tag (single tag, no params, no children)', () => {
        const result = new Tag('input').toString();
        const expected = '<input>';
        expect(result).toBe(expected)
    });

    it('should generate html tag (paired tag, no params, no children)', () => {
        const result = new Tag('div').toString();
        const expected = '<div></div>';
        expect(result).toBe(expected)
    });

    it('should generate html tag (single tag, with params, no children)', () => {
        const result = new Tag('img', { src: '/image.png', class: 'object-fit' }).toString();
        const expected = '<img src="/image.png" class="object-fit">';
        expect(result).toBe(expected)
    });

    it('should generate html tag (paired tag, with params, no children)', () => {
        const result = new Tag('p', { class: 'px-2 py-5' }).toString();
        const expected = '<p class="px-2 py-5"></p>';
        expect(result).toBe(expected)
    });

    it('should generate html tag (single tag, with params, with children)', () => {
        const result = new Tag('img', { src: '/image.png', class: 'object-fit' }, 'ignored text').toString();
        const expected = '<img src="/image.png" class="object-fit">';
        expect(result).toBe(expected)
    });

    it('should generate html tag (paired tag, with params, with children)', () => {
        const result = new Tag('p', { class: 'px-2 py-5' }, 'Hello There!').toString();
        const expected = '<p class="px-2 py-5">Hello There!</p>';
        expect(result).toBe(expected)
    });
});
