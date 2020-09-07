import path from "path";
import express from "express";
import { Request, Response } from "express";
//路由
import homeRouter from "./app/controllers/home";
import userRouter from "./app/controllers/user";
//中间件
import loggerMid from "./app/middlewares/logger";

const app = express(); //实例
const PORT = 5000;     //端口

//中间件
app.use(loggerMid);

//路由
app.use("/", homeRouter);
app.use("/user", userRouter);

//静态资源
app.use("/static", express.static(path.join(__dirname, "../public")));

//响应404
app.use((req: Request, res: Response, next: Function) => {
  res.status(404).send("Sorry can't find that!");
});

//处理错误
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//监听端口
app.listen(PORT, () => {
  console.log(`started http://localhost:${PORT}`);
});

// import React from "react";
// import { renderToString } from "react-dom/server";
// import { StaticRouter, Route } from "react-router-dom";
// import { matchRoutes } from "react-router-config";

// import fs from "fs";
// import path from "path";
// // import App from "../web/app.tsx";

// app.get("^/$", (req, res) => {

//   if (req.url.indexOf(".") > -1) {
//     res.end("");
//     return false;
// 	}

//   const content = renderToString(
//     <StaticRouter location={req.path} context={{}}>
//       <Route path="/">
//         <App />
//       </Route>
//     </StaticRouter>
//   );
//   // const htmlUrl = path.resolve("dist/web/index.html");
//   // fs.readFile(htmlUrl, "utf8", (err, data) => {
//   //   if (err) {
//   //     console.error(err);
//   //     return res.status(500).send("An error occurred");
//   //   }
//   //   return res.send(
//   //     data.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
//   //   );
//   // });
// });
