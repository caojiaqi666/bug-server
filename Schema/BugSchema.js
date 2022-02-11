const { Schema } = require("./config");

const BugSchema = new Schema(
  {
    // 受理人
    username: {
      type: String,
      required: true,
    },
    // 密码
  },
  {
    versionKey: false,
  }
);

module.exports = BugSchema;
