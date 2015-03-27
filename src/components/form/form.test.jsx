var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = Object.assign;
var Form = require('./form.jsx');
var sampleData = require('./form.sample-data');
var schemas = sampleData.map(field => field.schema);

// Let's build a valid set
var validSet = {};
sampleData.forEach((field) => {
  validSet[field.schema.id] = field.valid[0];
});

describe('form', function() {
  var instance;
  var refList;

  beforeEach(function () {
    instance = TestUtils.renderIntoDocument(<Form fields={schemas} />);
    refList = Object.keys(instance.refs)
      .filter(key => key.match('Field'))
      .map(key => instance.refs[key]);
  });

  describe('validation tests', function () {
    // Utility for testing all valid and invalid examples
    function testData(field, isValid) {
      var setKey = isValid ? 'valid' : 'invalid';
      if (!field[setKey]) return;

      field[setKey].forEach(test => {
        it(`${test} should be ${setKey}`, function (done) {
          instance.setState(validSet);
          var vals = {};
          vals[field.schema.id] = test;
          instance.setState(vals);
          instance.validate(() => {
            should(instance.isValid()).be.equal(isValid);
            done();
          });
        });
      });
    }
    it('should be valid for validSet', function (done) {
      instance.setState(validSet);
      instance.validate(() => {
        should(instance.isValid()).be.equal(true);
        done();
      });
    });

    it('refs should not have errors if form is valid', function (done) {
      instance.setState(validSet);
      instance.validate(() => {
        refList.forEach((ref) => {
          should(ref.state.error).be.equal(null);
        });
        done();
      });
    });

    it('should be invalid if the values are unchanged', function (done) {
      instance.validate(() => {
        should(instance.isValid()).be.equal(false);
        done();
      });
    });

    sampleData.forEach((field) => {
      describe(`tests for ${field.schema.id}`, function () {
        testData(field, true);
        testData(field, false);
      });
    });
  });

  describe('UI tests', function () {
    var validClass = 'has-success';
    var invalidClass = 'has-error';

    var field;
    var ref;
    var containerEl;
    var inputEl;

    beforeEach(function () {
      field = sampleData[0];
      ref = instance.refs[field.schema.id + 'Field'];
      containerEl = ref.getDOMNode();
      inputEl = containerEl.querySelector('input');
    });

    it('should not show validation immediately after key press', function () {
      TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
      console.log(inputEl.value);
      should(containerEl.className.match(validClass)).be.equal(null);
      should(containerEl.className.match(invalidClass)).be.equal(null);
    });

    it('should only show validation after first blur', function () {
      TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
      TestUtils.Simulate.change(inputEl, {target: {value: 'f'}});
      TestUtils.Simulate.blur(inputEl);
      should(containerEl.className.match(invalidClass)).be.ok;
    });

    it('should change validation on change after first blur', function () {
      // Change value to 'f' and blur
      TestUtils.Simulate.change(inputEl, {target: {value: 'f'}});
      TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
      TestUtils.Simulate.blur(inputEl);

      // Change value to 'fff', without blurring (valid)
      TestUtils.Simulate.change(inputEl, {target: {value: 'fff'}});
      TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
      TestUtils.Simulate.keyUp(inputEl, {key: 'f'});
      should(containerEl.className.match(validClass)).be.ok;

      // Change value back to 'ff' (invalid)
      TestUtils.Simulate.change(inputEl, {target: {value: 'ff'}});
      TestUtils.Simulate.keyUp(inputEl, {key: 'Backspace'});
      should(containerEl.className.match(validClass)).be.equal(null);
      should(containerEl.className.match(invalidClass)).be.ok;
    });

    it('should change show validation after submit button is pressed', function () {
      var btnEl = instance.refs.submitButton.getDOMNode();
      TestUtils.Simulate.submit(instance.getDOMNode());
      should(containerEl.className.match(invalidClass)).be.ok;
    });

  });

});
