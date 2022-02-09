const UserModel = require("../model/UserModel")
const login = async (ctx) => {
  // ctx.body = "hello world!";
  await ctx.render("login");
};

const chat = async (ctx) => {
  // ctx.body = "welcome";
  // 先确定用户状态,seesion是否过期

  if (ctx.session.isNew) {
    // 未登录状态, 停止函数向后执行，并且重定向到登录页
    return ctx.redirect('/')
  }

  
  // 需要进行一定的参数查询，
  let username = encodeURIComponent(ctx.cookies.get("username"))
  let passwd = encodeURIComponent(ctx.cookies.get("passwd"))
  let user = await UserModel.find({ username });
  

  if (user.length > 0 && user[0].passwd === passwd) {
    UserModel.updateOne({ username}, {online: true})
    
    let onlineUser = await UserModel.find({online: true})
    return await ctx.render("chat", {
      username: `<${username}>`,
      onlineUser
    });
  } else {
    return ctx.redirect('/')
  }
  
};

// 用户登录成功，写cookie和session

// 创建鉴权中间件,同步cookie和session
// 在鉴权路由中，确定session是否，从而知道用户状态
const keepLog = async (ctx, next) => {
  if (ctx.session.isNew) { // true session不存在  false 有session
    let username = ctx.cookies.get("username")
    if (username) { // true = 登录成功时设置的值，false=空字符串
      // 同步session
      let passwd = ctx.cookies.get("passwd")
      ctx.session = {
        username,
        passwd
      }
    }
  }
  // 上面已经同步了cookie和session，把控制权交到路由对应的处理中间手中
  await next()
};

module.exports = {
  login,
  chat,
  keepLog,
};
