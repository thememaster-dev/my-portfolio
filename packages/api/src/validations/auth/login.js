const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email.toString() : "";
  data.password = !isEmpty(data.password) ? data.password.toString() : "";

  if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.message = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.message = "Password field is required";
  } else {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.message = "Password must be at least 6 characters";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
