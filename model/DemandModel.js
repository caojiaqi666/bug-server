const DemandSchema = require("../Schema/DemandSchema.js");
const { db } = require("../Schema/config.js");

const DemandModel = db.model("demand", DemandSchema);

module.exports = DemandModel;
