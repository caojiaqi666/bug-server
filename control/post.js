const UserModel = require("../model/UserModel.js");
const BugModel = require("../model/BugModel.js");
// require模块，模块里的代码才会执行

// 鉴权中间件
const getUserRights = async (ctx) => {
  let username = ctx.cookies.get("username") || null;
  if (username) {
    // 有cookie时
    let user = await UserModel.find({ username });
    if (user.length > 0) {
      return (ctx.body = {
        state: 0,
        msg: "有登录态",
        user: user[0],
      });
    } else {
      return (ctx.body = {
        state: 0,
        msg: "查无此人",
        user: -1,
      });
    }
  } else {
    // 没用cookie，或者cookie过期时
    return (ctx.body = {
      state: 5,
      msg: "身份信息不存在或已过期",
      user: -1,
    });
  }
};

const writeCookie = (ctx, name, pass) => {
  const cookieConfig = {
    domain: "localhost", // 在这个域名中生效
    path: "/",
    maxAge: 60 * 60 * 12 * 1000,
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
    // 重定向到聊天页面
    return (ctx.body = {
      state: 1,
      msg: "用户名不存在",
    });
  } else {
    if (passwd !== user.passwd) {
      return (ctx.body = {
        state: 2,
        msg: "密码错误",
      });
    }
    console.log(`${user.username}登录成功`);
    writeCookie(ctx, username, passwd);
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
  let createDate = new Date();
  if (!user) {
    // 如果用户名还没被使用
    try {
      let u = new UserModel({ username, passwd, online: true, createDate });
      await u.save();
      return (ctx.body = {
        state: 0,
        msg: "注册成功",
      });
    } catch (e) {
      console.log("e: ", e);
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
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  const { username, password, email, power } = ctx.request.body;

  if (nowUserPower < 2) {
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
  }
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
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 2)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
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
      .skip(pageNum - 1 || 0)
      .limit(pageSize || 20)
      .sort({ _id: -1 });
    let total = await UserModel.count();
    return (ctx.body = {
      state: 0,
      msg: "查询成功",
      total,
      userList,
    });
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      state: -1,
      msg: "服务器错误，请稍后再试~",
    });
  }
};

const changeInfo = async (ctx) => {
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 2)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
  const { _id, username, passwd, avatar, email, power } = ctx.request.body;
  try {
    let res = await UserModel.findByIdAndUpdate(_id, {
      username,
      passwd,
      avatar,
      email,
      power,
    });
    if (res) {
      return (ctx.body = {
        state: 0,
        msg: "更新成功",
      });
    } else {
      return (ctx.body = {
        state: 1,
        msg: "更新失败",
      });
    }
  } catch (err) {
    return (ctx.body = {
      state: -1,
      msg: "更新失败" + err,
    });
  }
};

const deleteUser = async (ctx) => {
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 2)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
  const { _id } = ctx.request.body;
  try {
    let res = await UserModel.deleteOne({ _id });
    if (res) {
      return (ctx.body = {
        state: 0,
        msg: "删除成功",
      });
    } else {
      return (ctx.body = {
        state: 1,
        msg: "删除失败",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    return (ctx.body = {
      state: -1,
      msg: "服务器错误",
    });
  }
};

const createBug = async (ctx) => {
  let r = await getUserRights(ctx);
  console.log("r: ", r);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 1)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
  const {
    bugType,
    content,
    priority,
    receiver,
    relationDemand,
    relationProject,
    remarks,
    severity,
    title,
  } = ctx.request.body;

  let bug = await BugModel.findOne({ title });
  if (!bug) {
    // 如果用户名还没被使用
    try {
      let createTime = new Date();
      let u = new BugModel({
        receiver,
        submitter: r.user.username,
        createTime,
        title,
        content,
        relationDemand: [],
        relationProject: [],
        priority,
        severity,
        remarks,
        bugType,
      });
      await u.save();
      // writeCookie(ctx, username, passwd)
      return (ctx.body = {
        state: 0,
        msg: "创建bug成功",
        u,
      });
    } catch (e) {
      console.log("e: ", e);
      return (ctx.body = {
        state: -1,
        msg: "数据存储到数据库失败",
      });
    }
  } else {
    return (ctx.body = {
      state: 1,
      msg: "Bug名已存在",
      bug,
    });
  }
};

const selectBug = async (ctx) => {
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 1)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
  const {
    _id,
    submitter,
    title,
    priority,
    severity,
    status,
    pageNum,
    pageSize,
  } = ctx.request.body;
  try {
    let sp = {};
    if (_id !== "") {
      sp._id = _id;
    }
    if (submitter !== "") {
      sp.submitter = submitter;
    }
    if (title !== "") {
      sp.title = title;
    }
    if (priority !== "") {
      sp.priority = priority;
    }
    if (severity !== "") {
      sp.severity = severity;
    }
    if (status !== "") {
      sp.status = status;
    }
    // 分页查询用户列表
    let bugsList = await BugModel.find(sp)
      .skip(pageNum - 1 || 0)
      .limit(pageSize || 20)
      .sort({ status: -1 });
    console.log("---------------------- ", bugsList);
    let total = await BugModel.count();
    return (ctx.body = {
      state: 0,
      msg: "查询成功",
      total,
      bugsList,
    });
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      state: -1,
      msg: "服务器错误，请稍后再试~",
    });
  }
};

const deleteBug = async (ctx) => {
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 2)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
  const { _id } = ctx.request.body;
  try {
    let res = await BugModel.deleteOne({ _id });
    if (res) {
      return (ctx.body = {
        state: 0,
        msg: "删除成功",
      });
    } else {
      return (ctx.body = {
        state: 1,
        msg: "删除失败",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    return (ctx.body = {
      state: -1,
      msg: "服务器错误",
    });
  }
};

const changeBug = async (ctx) => {
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 1)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });
  const { _id, status, title, priority, severity } = ctx.request.body;
  try {
    let res = await BugModel.findByIdAndUpdate(_id, {
      status,
      title,
      priority,
      severity,
    });
    if (res) {
      return (ctx.body = {
        state: 0,
        msg: "更新成功",
      });
    } else {
      return (ctx.body = {
        state: 1,
        msg: "更新失败",
      });
    }
  } catch (err) {
    return (ctx.body = {
      state: -1,
      msg: "更新失败" + err,
    });
  }
};

const searchData = async (ctx) => {
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 0)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });

  try {
    let userTotal = await UserModel.count();
    let bugTotal = await BugModel.count();
    let completeBugs = (await BugModel.find({ status: 2 })?.length) || 0;
    return (ctx.body = {
      state: 0,
      msg: "查询成功",
      userTotal,
      bugTotal,
      completeBugs,
    });
  } catch (err) {
    return (ctx.body = {
      state: -1,
      msg: "查询失败" + err,
    });
  }
};

const searchLineData = async (ctx) => {
  let r = await getUserRights(ctx);
  if (r.state == 5) return r;
  let nowUserPower = r.user.power;
  if (nowUserPower < 0)
    return (ctx.body = {
      state: 4,
      msg: "您没有此权限",
    });

  try {
    let createBugs = []; // 每一天创建的bug数量
    let completeBugs = []; // 每一天完成的bug数量
    for (let i = 7; i >= 1; i--) {
      stime = new Date().setHours(0, 0, 0, 0) - 86400 * i * 1000;
      etime = new Date().setHours(0, 0, 0, 0) - 86400 * (i - 1) * 1000;
      let createBugCount =
        (await BugModel.find({
          createTime: {
            $gte: stime,
            $lte: etime,
          },
        })?.count()) || 0;
      let completeBugCount =
        (await BugModel.find({
          fixedTime: {
            $gte: stime,
            $lte: etime,
          },
        })?.count()) || 0;
      createBugs.push(createBugCount);
      completeBugs.push(completeBugCount);
    }
    return (ctx.body = {
      state: 0,
      msg: "查询成功",
      createBugs,
      completeBugs,
    });
  } catch (err) {
    return (ctx.body = {
      state: -1,
      msg: "查询失败" + err,
    });
  }
};

module.exports = {
  login,
  register,
  addUser,
  selectUser,
  changeInfo,
  deleteUser,
  createBug,
  selectBug,
  deleteBug,
  changeBug,
  searchData,
  searchLineData,
};
