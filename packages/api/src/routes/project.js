const express = require('express');
const passport = require('passport');

const router = express.Router();

const { isAdmin } = require('../middlewares');

// Controllers
const { createProject } = require('../controllers/project');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  createProject
);

module.exports = router;
