var React = require('react/addons');
var classSet = require('classnames');

var Field = React.createClass({
  getDefaultProps: function () {
    return {
      type: 'text'
    }
  },
  getInitialState: function() {
    return {
      error: null,
      dirty: false
    };
  },
  onBlur: function () {
    this.setState({
      dirty: true
    });
  },
  render: function () {

    var dirty = this.state.dirty || this.props.formSubmitted;
    var hasSuccess = dirty && this.props.isValid(this.props.id);
    var hasError = dirty && !this.props.isValid(this.props.id);

    var className = classSet({
      'form-group': true,
      'has-feedback': dirty,
      'has-success': hasSuccess,
      'has-error': hasError
    });

    var props = {
      type: this.props.type,
      placeholder: this.props.placeholder,
      onKeyUp: this.props.handleValidation(this.props.id),
      onBlur: this.onBlur,
      valueLink: this.props.linkState(this.props.id)
    };

    var errors = [];
    if (hasError) {
      errors = this.props.errorMessage ? [this.props.errorMessage] : this.props.getValidationMessages();
    }

    return (<div className={className}>
      <label>{this.props.label}</label>
      <input className="form-control" {...props} />
      <p className="help-block">
        {errors.map(err => <span key={err} className="help-block">{err}</span>)}
      </p>
    </div>);
  }
});

module.exports = Field;
