const express = require("express");
const router = require("./router");
const errorHandler = require("./middleware/error-handler");
const cors = require("cors");
const app = express();
// 配置请求体为json格式
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 跨域访问
app.use(cors());
// 静态资源托管
app.use(express.static("./assent"));
// 挂载路由
app.use(router);
// 处理错误中间件
app.use(errorHandler());
app.listen(3000, () => {
  console.log("server is running");
});
