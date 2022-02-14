const BugSchema = require("../Schema/BugSchema.js");
const { db } = require("../Schema/config.js");

const BugModel = db.model("bug", BugSchema);

module.exports = BugModel;
