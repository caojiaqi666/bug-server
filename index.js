const Koa = require("koa");
const app = new Koa();
const session = require("koa-session");
const { resolve } = require("path");
const views = require("koa-views");
const koaStatic = require("koa-static");
const koaBody = require("koa-body");
const router = require("./routes/router");

const CONFIG = {
  key: "SID",
  maxAge: 36e5,
  overwrite: true, // 是否可重写
  httpOnly: true, // (boolean) 前端是否可见
  signed: true /** (boolean) signed or not (default true) */,
  rolling: true /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
};

//临时处理一下跨域
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});
app
  .use(session(CONFIG, app))
  // 加载静态资源模块
  // .use(koaStatic(resolve(__dirname + "static")))  注意不是+!!!!!!!!!!!!!
  .use(koaStatic(resolve(__dirname, "static")))
  // 加载post请求数据解析模块
  .use(koaBody())
  // 加载路由模块
  .use(router.routes())
  // 加载自定义中间件-用来处理404情况
  .use(async (ctx, next) => {
    // await next();
    if (ctx.status === 404) {
      ctx.body = "那咋妹找到呢~";
    } else if (ctx.status >= 500) {
      ctx.body = "服务器开小差了,请稍候再试~";
    }
  });

// 获取到koa返回的server对象，供socket使用
const server = app.listen(9527);
