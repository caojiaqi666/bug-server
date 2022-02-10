const UserModel = require("../model/UserModel.js");
// require模块，模块里的代码才会执行

const writeCookie = (ctx, name, pass) => {
  const cookieConfig = {
    domain: "localhost", // 在这个域名中生效
    path: "/",
    maxAge: 36e5,
    httpOnly: true, // 前端是否可见
    overwrite: false, //前端不可重写
  };
  // 不允许写中文，需要decode
  let deName = encodeURIComponent(name);
  let dePass = encodeURIComponent(pass);
  ctx.cookies.set("username", deName, cookieConfig);
  ctx.cookies.set("passwd", dePass, cookieConfig);

  ctx.session = {
    deName,
    dePass,
  };
};

const login = async (ctx) => {
  const { username, passwd } = ctx.request.body;

  let user = await UserModel.findOne({ username });
  if (!user) {
    // 如果用户名还没被使用
    // writeCookie(ctx, username, passwd)
    // 重定向到聊天页面
    return (ctx.body = {
      state: 1,
      msg: "用户名不存在",
    });
  } else {
    if (passwd !== user.passwd) {
      console.log("密码不对");
      return (ctx.body = {
        state: 2,
        msg: "密码错误",
      });
    }
    console.log("登录成功");
    // writeCookie(ctx, username, passwd)
    return (ctx.body = {
      state: 0,
      msg: "登录成功",
      user,
    });
  }
};

const register = async (ctx) => {
  const { username, passwd } = ctx.request.body;

  let user = await UserModel.findOne({ username });
  if (!user) {
    // 如果用户名还没被使用
    try {
      let u = new UserModel({ username, passwd, online: true });
      await u.save();
      // writeCookie(ctx, username, passwd)
      // 重定向到聊天页面
      return (ctx.body = {
        state: 0,
        msg: "注册成功",
      });
    } catch (e) {
      return (ctx.body = {
        state: -1,
        msg: "数据存储到数据库失败",
      });
    }
  } else {
    return (ctx.body = {
      state: 1,
      msg: "用户名已存在",
      user,
    });
  }
};

const addUser = async (ctx) => {
  const { username, password, email, power } = ctx.request.body;

  let user = await UserModel.findOne({ username });
  if (!user) {
    // 如果用户名还没被使用
    try {
      let createDate = new Date();
      let u = new UserModel({
        username,
        passwd: password,
        email,
        power,
        createDate,
      });
      await u.save();
      // writeCookie(ctx, username, passwd)
      return (ctx.body = {
        state: 0,
        msg: "注册成功",
      });
    } catch (e) {
      return (ctx.body = {
        state: -1,
        msg: "数据存储到数据库失败",
      });
    }
  } else {
    return (ctx.body = {
      state: 1,
      msg: "用户名已存在",
      user,
    });
  }
};

const selectUser = async (ctx) => {
  const { id, username, power, pageNum, pageSize } = ctx.request.body;
  try {
    let searchParams = {};
    if (id) {
      searchParams.id = id;
    }
    if (username) {
      searchParams.username = username;
    }
    if (power) {
      searchParams.power = power;
    }
    // 分页查询用户列表
    let userList = await UserModel.find({ ...searchParams })
      .skip(pageNum)
      .limit(pageSize || 10)
      .sort({ _id: -1 });
    console.log("userList: ", userList);
    return (ctx.body = {
      state: 0,
      msg: "查询成功",
      total: 100,
      userList,
    });
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      state: -1,
      msg: "服务器错误，请稍后再试~"
    });
  }
};
module.exports = {
  login,
  register,
  addUser,
  selectUser,
};
