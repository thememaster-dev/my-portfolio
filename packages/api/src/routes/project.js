const express = require('express');
const passport = require('passport');

const router = express.Router();

const { isAdmin } = require('../middlewares');

// Controllers
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project');

router.get('/', getProjects);

router.get('/:slug', getProject);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  createProject
);

router.put(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  updateProject
);

router.delete(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  deleteProject
);

module.exports = router;
