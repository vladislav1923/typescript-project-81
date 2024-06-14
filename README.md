### Hexlet
[![Actions Status](https://github.com/vladislav1923/typescript-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/vladislav1923/typescript-project-81/actions)

### Typescript CI
[![Actions Status](https://github.com/vladislav1923/typescript-project-81/actions/workflows/typescript.yml/badge.svg)](https://github.com/vladislav1923/typescript-project-81/actions)

### Tests Coverage
[![Test Coverage](https://api.codeclimate.com/v1/badges/3275b6e87e71dc6e8137/test_coverage)](https://codeclimate.com/github/vladislav1923/typescript-project-81/test_coverage)

Example of using the library:
```typescript
const template = { name: 'rob', job: 'hexlet' };
const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
    f.input('name');
    f.input('job', { as: 'textarea' });
    f.submit('Send Form');
});

console.log(form);

//  <form action="#" method="post">
//      <label for="name">Name</label>
//      <input name="name" type="text" value="rob">
//      <label for="job">Job</label>
//      <textarea name="job" cols="20" rows="40">hexlet</textarea>
//      <input type="submit" value="Send Form">
//  </form>
```
