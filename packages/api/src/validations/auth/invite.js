const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.invitedEmails = data.invitedEmails ? data.invitedEmails : [];

  if (!Array.isArray(data.invitedEmails)) {
    errors.message = "invitedEmails must be an array !!!";
  }
  if (data.invitedEmails.length === 0) {
    errors.message = "At least one mail is required !!!";
  }
  if (data.invitedEmails.length > 10) {
    errors.message = "10 mail at a time can be invited !!!";
  }

  for (let i = 0; i < data.invitedEmails.length; i++) {
    if (!Validator.isEmail(data.invitedEmails[i].toString())) {
      errors.message = "A mail is invalid!!!!";
      break;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
