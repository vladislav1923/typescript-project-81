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

test('should generate form (set url, an input)', () => {
  const result = Form.formFor(
    { name: 'Franky' },
    { url: '/submit' },
    (form: Form) => form.input('name'),
  );
  const expected = '<form method="post" action="/submit"><input name="name" value="Franky" type="text"></form>';
  expect(result).toBe(expected);
});

test('should generate form (set url, two inputs)', () => {
  const result = Form.formFor(
    { name: 'Franky', age: '18' },
    { url: '/submit' },
    (form: Form) => {
      form.input('name');
      form.input('age');
    },
  );
  const expected = '<form method="post" action="/submit"><input name="name" value="Franky" type="text"><input name="age" value="18" type="text"></form>';
  expect(result).toBe(expected);
});

test('should generate form (set url, an input and a textarea)', () => {
  const result = Form.formFor(
    { name: 'Franky', job: 'Engineer' },
    { url: '/submit' },
    (form: Form) => {
      form.input('name');
      form.input('job', { as: 'textarea', rows: 50, cols: 50 });
    },
  );
  const expected = '<form method="post" action="/submit"><input name="name" value="Franky" type="text"><textarea name="job" as="textarea" rows="50" cols="50">Engineer</textarea></form>';
  expect(result).toBe(expected);
});

test('should throw an error if an input name is not included in the template', () => {
  const expectedErrorMessage = 'Error: Field salary does not exist in the template.';

  try {
    Form.formFor(
      { name: 'Franky', job: 'Engineer' },
      { url: '/submit' },
      (form: Form) => {
        form.input('name');
        form.input('job', { as: 'textarea', rows: 50, cols: 50 });
        form.input('salary');
      },
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      expect(e.message).toBe(expectedErrorMessage);
    }
  }
});
