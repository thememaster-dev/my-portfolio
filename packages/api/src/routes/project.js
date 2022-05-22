const express = require("express");
const passport = require("passport");

const router = express.Router();

// Controllers
const {
  getPublishedProjects,
  getUnPublishedProjects,
  getPublishedProject,
  getUnPublishedProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

router.get("/published/page/:page", getPublishedProjects);

router.get(
  "/unpublished/page/:page",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getUnPublishedProjects
);

router.get("/published/:slug", getPublishedProject);

router.get(
  "/unpublished/:slug",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getUnPublishedProject
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createProject
);

router.put(
  "/:slug",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateProject
);

router.delete(
  "/:slug",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteProject
);

module.exports = router;
