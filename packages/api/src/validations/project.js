const Validator = require('validator');
const isEmpty = require('./is-empty');

exports.validateProjectInput = (data) => {
  const errors = {};
  const newData = { ...data };
  newData.title = !isEmpty(data.title) ? data.title : '';
  newData.body = !isEmpty(data.body) ? data.body : '';

  if (!Validator.isLength(newData.title, { min: 2, max: 50 })) {
    errors.title = 'Title must be between 2 and 50 characters';
  }

  if (Validator.isEmpty(newData.title)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(newData.body)) {
    errors.body = 'body field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
