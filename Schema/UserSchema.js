const { Schema } = require("./config");

let defaultAva = Math.floor(Math.random(0, 1) * 12 + 1);
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
    // 用户头像
    avatar: {
      type: String,
      required: false,
      default: `http://localhost:9527/avatar/default${defaultAva}.png`,
    },
    email: {
      type: String,
      required: false,
    },
    // 权限   0:游客,1:普通用户,2:系统管理员,3:boss
    power: {
      type: Number,
      required: false,
      default: 0,
    },
    // 创建日期
    createDate: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;
