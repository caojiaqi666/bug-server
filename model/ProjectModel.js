const ProjectSchema = require("../Schema/ProjectSchema.js");
const { db } = require("../Schema/config.js");

const ProjectModel = db.model("project", ProjectSchema);

module.exports = ProjectModel;
