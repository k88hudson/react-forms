# React forms demo

## Get started

```
npm install
npm start
```

### What does this do?

The `<Form />` component allows you to pass a schema of fields, and sets a validation state on the each element as well as the form itself. It uses `Joi` for validation.

## Tests

### Test runner

Tests use `mocha` with `should` for assertions. All tests matching the form `*.test.jsx` are picked up from the `src/` with this little bit of code:

```js
var req = require.context('../src', true, /\.test\.jsx$/);
req.keys().forEach(function (file) {
  req(file);
});
```

### UI tests

Using React.TestUtils, we can make sure that UI behaves the want it to. For example, we can check to make sure the UI does not immediately show a validation state after a single key press:

```js
it('should not show validation immediately after key press', function () {
  TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
  TestUtils.Simulate.change(inputEl, {target: {value: 'f'}});
  should(containerEl.className.match(validClass)).be.equal(null);
  should(containerEl.className.match(invalidClass)).be.equal(null);
});
```

Similarly, we can make sure the UI *does* show validation after the first blur:

```js
it('should only show validation after first blur', function () {
  TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
  TestUtils.Simulate.change(inputEl, {target: {value: 'f'}});
  TestUtils.Simulate.blur(inputEl);
  should(containerEl.className.match(invalidClass)).be.ok;
});
```

Finally, let's make sure on subsequent changes (after the first blur), the UI updates immediately:

```js
// Change value to 'f' and blur
TestUtils.Simulate.change(inputEl, {target: {value: 'f'}});
TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
TestUtils.Simulate.blur(inputEl);

// Change value to 'fff', without blurring (valid)
TestUtils.Simulate.change(inputEl, {target: {value: 'fff'}});
TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
should(containerEl.className.match(validClass)).be.ok;
```
