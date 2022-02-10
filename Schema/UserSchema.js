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
    // 用户头像
    avatar: {
      type: String,
      required: false,
      default: "../static/imgs/avatar.gif",
    },
    email: {
      type: String,
      required: false,
    },
    // 用户类型
    // type: {
    //   type: String,
    //   required: false,
    //   default: "user",
    // },
    // 权限
    power: {
      type: Number,
      required: false,
      default: 0,
    },
    // 创建日期
    createDate: {
      type: Number,
      required: false, //111
      default: 0,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;
