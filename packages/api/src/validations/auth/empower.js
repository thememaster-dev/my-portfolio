const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.target = !isEmpty(data.target) ? data.target.toString() : "";
  data.role = !isEmpty(data.role) ? data.role.toString() : "";

  if (!Validator.isEmail(data.target)) {
    errors.message = "Email is invalid";
  }
  if (Validator.isEmpty(data.target)) {
    errors.message = "email field is required";
  }
  if (Validator.isEmpty(data.role)) {
    errors.message = "role field is required";
  }
  if (
    data.role !== "admin" &&
    data.role !== "moderator" &&
    data.role !== "editor" &&
    data.role !== "visitor"
  ) {
    errors.message = "Invalid role";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
