import { expect, test } from 'vitest';
import Form from './Form';

test('should generate form (empty url)', () => {
  const result = Form.formFor({}, {});
  const expected = '<form method="post" action="#"></form>';
  expect(result).toBe(expected);
});

test('should generate form (set url)', () => {
  const result = Form.formFor({}, { url: '/submit' });
  const expected = '<form method="post" action="/submit"></form>';
  expect(result).toBe(expected);
});
