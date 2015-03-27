var React = require('react/addons');
var ValidationMixin = require('react-validation-mixin');
var getValidators = require('../../validators');
var assign = require('react/lib/Object.assign');
var Field = require('./field.jsx');

var Form = React.createClass({
  mixins: [
    ValidationMixin,
    React.addons.LinkedStateMixin
  ],
  validatorTypes: {},
  componentDidMount: function () {
    this.validatorTypes = getValidators(this.props.fields);
  },
  getInitialState: function() {
    return {
      submitted: false,
      errors: {}
    };
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.setState({submitted: true});
    this.validate((err) => {
      if (this.props.onSubmit) this.props.onSubmit(this.state, !err);
    });
  },
  render: function () {
    return (<form onSubmit={this.onSubmit}>
      {this.props.fields.map((props) => {

        return (<Field
          {...props}
          ref={props.id + 'Field'}
          key={props.id}
          isValid={() => this.isValid(props.id)}
          handleValidation={this.handleValidation}
          getValidationMessages={() => this.getValidationMessages(props.id)}
          linkState={this.linkState}
          formSubmitted={this.state.submitted}
        />);
      })}
      <div className="form-group">
        <button ref="submitButton" className="btn btn-default" type="submit">Submit</button>
      </div>
    </form>);
  }
});

module.exports = Form;
