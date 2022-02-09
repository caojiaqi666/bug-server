const { Schema } = require("./config");

const UserSchema = new Schema(
  {
    // 用户名
    username: {
      type: String,
      required: true,
    },
    // 密码
    passwd: {
      type: String,
      required: true,
    },
    // 用户类型
    type: {
      type: String,
      default: "user",
    },
    // 权限
    power: {
      type: Number,
      required: false,
      default: 0,
    },
    team: {
      type: Array,
      default: [],
      required: false,
    },
    demand: {
      type: Array,
      default: [],
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;
