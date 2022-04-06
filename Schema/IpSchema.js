const { Schema } = require("./config");

const IpSchema = new Schema(
  {
    // ip地址
    ip: {
      type: String,
      required: true,
    },
    // 日期
    date: {
      type: String,
      required: false,
      default: "",
    },
    // 操作类型 0: 登录 1:修改用户信息 2:修改任务
    type: {
      type: Number,
      required: false,
      default: 0,
    },
    // 操作者
    operator: {
      type: String,
      required: true,
      default: "",
    },
    // 操作
    operation: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = IpSchema;
