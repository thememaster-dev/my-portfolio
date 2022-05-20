const express = require("express");

const router = express.Router();

// middlewares
const authMiddlewares = require("../middlewares/auth");
const requireAuth = authMiddlewares.requireAuth;

const validateMiddleware = require("../middlewares/validate");

const validateRegister = require("../validations/auth/register");
const validateLogin = require("../validations/auth/login");
const validEmail = require("../validations/auth/email");
const validateOtp = require("../validations/auth/otp");
const validateResetPassword = require("../validations/auth/passReset");
const validateInvitation = require("../validations/auth/invite");

// Controllers
const {
  register,
  login,
  me,
  invite,
  forgetPassword,
  matchOtp,
  resetPassword,
} = require("../controllers/auth");

// Auth Routes
router.get("/me", requireAuth, me);
router.post(
  "/signup",

  validateMiddleware(validateRegister),
  register
);

router.post(
  "/login",

  validateMiddleware(validateLogin),
  login
);

router.post(
  "/forgetPassword",

  validateMiddleware(validEmail),
  forgetPassword
);
router.post(
  "/matchOtp",

  validateMiddleware(validateOtp),
  matchOtp
);
router.put(
  "/resetPassword",
  requireAuth,
  validateMiddleware(validateResetPassword),
  resetPassword
);

router.post(
  "/invite",

  requireAuth,
  validateMiddleware(validateInvitation),
  invite
);

module.exports = router;
