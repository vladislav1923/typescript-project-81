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
  const expected = '<form method="post" action="/submit"><label for="name">Name</label><input name="name" type="text" value="Franky"></form>';
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
  const expected = '<form method="post" action="/submit"><label for="name">Name</label><input name="name" type="text" value="Franky"><label for="age">Age</label><input name="age" type="text" value="18"></form>';
  expect(result).toBe(expected);
});

test('should generate form (set url, input and textarea)', () => {
  const result = Form.formFor(
    { name: 'Franky', job: 'Engineer' },
    { url: '/submit' },
    (form: Form) => {
      form.input('name');
      form.input('job', { as: 'textarea', rows: 50, cols: 50 });
    },
  );
  const expected = '<form method="post" action="/submit"><label for="name">Name</label><input name="name" type="text" value="Franky"><label for="job">Job</label><textarea name="job" as="textarea" rows="50" cols="50">Engineer</textarea></form>';
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

test('should generate form (set url, input, textarea and submit button with default text)', () => {
  const result = Form.formFor(
    { name: 'Franky', job: 'Engineer' },
    { url: '/submit' },
    (form: Form) => {
      form.input('name');
      form.input('job', { as: 'textarea', rows: 50, cols: 50 });
      form.submit();
    },
  );
  const expected = '<form method="post" action="/submit"><label for="name">Name</label><input name="name" type="text" value="Franky"><label for="job">Job</label><textarea name="job" as="textarea" rows="50" cols="50">Engineer</textarea><input value="Save" type="submit"></form>';
  expect(result).toBe(expected);
});
