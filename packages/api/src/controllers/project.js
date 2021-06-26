const Project = require('../models/project');
const { validateProjectInput } = require('../validations/project');

exports.getPublishedProjects = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 8;
  const skip = page * limit - limit;

  const projectPromise = await Project.find({ published: true })
    .skip(skip)
    .limit(limit)
    .sort({
      createdAt: 'desc',
    });

  const countPromise = Project.count({ published: true });

  const [project, count] = await Promise.all([projectPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!project.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }

  return res.status(200).json({
    success: true,
    project: project,
    page,
    pages,
    count,
  });
};

exports.getUnPublishedProjects = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 8;
  const skip = page * limit - limit;

  const projectPromise = await Project.find({ published: false })
    .skip(skip)
    .limit(limit)
    .sort({
      createdAt: 'desc',
    });

  const countPromise = Project.count({ published: false });

  const [project, count] = await Promise.all([projectPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!project.length && skip) {
    return res
      .status(400)
      .json({ success: false, errors: { message: "Page doesn't exist" } });
  }

  return res.status(200).json({
    success: true,
    project: project,
    page,
    pages,
    count,
  });
};

exports.getPublishedProject = async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
    published: true,
  });
  if (!project)
    return res
      .status(400)
      .json({ success: false, errors: { message: 'Project not found' } });

  return res.status(200).json({
    success: true,
    project: JSON.parse(JSON.stringify(project)),
  });
};

exports.getUnPublishedProject = async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
    published: false,
  });
  if (!project)
    return res
      .status(400)
      .json({ success: false, errors: { message: 'Project not found' } });

  return res.status(200).json({
    success: true,
    project: JSON.parse(JSON.stringify(project)),
  });
};

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
    ...(req.body?.projectUrl && {
      projectUrl: req.body.projectUrl,
    }),
  });

  await newProject.save();

  return res.status(200).json({ success: true, project: newProject });
};

exports.updateProject = async (req, res) => {};

exports.deleteProject = async (req, res) => {};
