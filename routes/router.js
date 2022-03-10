const r = require("koa-router")();
const get = require("../control/get");
const post = require("../control/post");

r.get("/", get.login);

// 验证cookie后跳转
// r.get("/chat", get.keepLog, get.chat);

// 首页登录验证接口
r.post("/login", post.login);

// 注册接口
r.post("/register", post.register);

// 添加用户接口
r.post("/addUser", post.addUser);

// 查询所有用户接口
r.post("/selectUser", post.selectUser);

// 修改用户信息
r.post("/changeInfo", post.changeInfo);

// 删除用户
r.post("/deleteUser", post.deleteUser);

// 上传图片接口

// 创建bug
r.post("/createBug", post.createBug);

// 查询bug
r.post("/selectBug", post.selectBug);

// 删除bug
r.post("/deleteBug", post.deleteBug);

// 数据看板-查询数据
r.post("/searchData", post.searchData);

// 数据看板-查询折线图数据
r.post("/searchLineData", post.searchLineData);

module.exports = r;
