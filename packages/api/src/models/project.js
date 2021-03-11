const mongoose = require('mongoose');
const slug = require('slugs');

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    skills: [String],
    slug: String,
    projectUrl: {
      type: String,
      default: null,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.pre('save', async function (next) {
  if (!this.isModified('title')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.title);
  // find other stores that have a slug of test, test-1, test-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const projectWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (projectWithSlug.length) {
    this.slug = `${this.slug}-${projectWithSlug.length + 1}`;
  }
  next();
});

ProjectSchema.index({ name: 'text', title: 'text' });

module.exports = mongoose.model('Project', ProjectSchema);
