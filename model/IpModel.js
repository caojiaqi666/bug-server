const IpSchema = require("../Schema/IpSchema.js");
const { db } = require("../Schema/config.js");

const IpModel = db.model("ips", IpSchema);

module.exports = IpModel;
