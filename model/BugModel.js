const BugSchema = require("../Schema/BugSchema.js");
const { db } = require("../Schema/config.js");

const BugModel = db.model("bugs", BugSchema);

module.exports = BugModel;
