const Validator = require("validator");
const isEmpty = require("../is-empty");

const checkCharecters = require("../../helpers/charecterChecker");

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email.toString() : "";

  data.password = !isEmpty(data.password) ? data.password.toString() : "";
  data.name = !isEmpty(data.name) ? data.name.toString() : "";

  if (Validator.isEmpty(data.email)) {
    errors.message = "email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalidddd";
  }

  if (Validator.isEmpty(data.password)) {
    errors.message = "Password field is required";
  } else {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.message = "Password must be at least 6 characters";
    }
  }
  if (!Validator.isEmpty(data.name)) {
    if (!Validator.isLength(data.name, { min: 1, max: 30 })) {
      errors.message = "Name must be of 1 to 30 charecter!";
    }

    if (checkCharecters.charecterChecker(data.name) === false) {
      errors.message = "No special charecters are allowed in site name!";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
