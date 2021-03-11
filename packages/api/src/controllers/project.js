const Project = require('../models/project');
const { validateProjectInput } = require('../validations/project');

exports.getProjects = async (req, res) => {};

exports.getProject = async (req, res) => {};

exports.createProject = async (req, res) => {
  const { errors, isValid } = validateProjectInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const newProject = new Project({
    title: req.body.title,
    body: req.body.body,
    ...(req.body?.skills && {
      skills: [...req.body.skills],
    }),
  });

  await newProject.save();

  return res.status(200).json({ success: true, project: newProject });
};

exports.updateProject = async (req, res) => {};

exports.deleteProject = async (req, res) => {};
