var Joi = require('joi');

var strategies = {
  username: Joi.string().token().min(3).max(30),
  password: Joi.string().min(5),
  email: Joi.string().email()
};

module.exports = function (fields) {
  var result = {};
  fields.forEach(function (field) {
    // Don't validate disabled fields
    if (field.disabled) return;

    // Add validators by id if specified
    if (field.validator) {
      result[field.id] = strategies[field.validator];
      result[field.id] = result[field.id].label(field.label);
    }

    // Add required validator
    if (field.required) {
      result[field.id] = (result[field.id] || Joi).required();
    }
  });
  return result;
};
