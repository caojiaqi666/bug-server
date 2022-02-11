const r = require("koa-router")();
const get = require("../control/get");
const post = require("../control/post");

r.get("/", get.login);

// 验证cookie后跳转
r.get("/chat", get.keepLog, get.chat);

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
// const multer = require("koa-multer"); //加载koa-multer模块
// // 上传 图片
// var storage = multer.diskStorage({
//   //文件保存路径
//   destination: function (req, file, cb) {
//     cb(null, "static/imgs/");
//   },
//   //修改文件名称
//   filename: function (req, file, cb) {
//     var fileFormat = file.originalname.split(".");
//     cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
//   },
// });
// //加载配置
// var upload = multer({
//   storage: storage,
// });
// r.post("/upload", upload.single("file"), async (ctx, next) => {
//   ctx.body = {
//     filename: ctx.req.file.filename, //返回文件名
//   };
// });

module.exports = r;
