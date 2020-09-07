import App from './app'
import bodyParser from "body-parser";
import loggerMiddleware from './middleware/logger'

const app = new App({
  port: 5000,
  controllers: [
      // new HomeController(),
      // new PostsController()
  ],
  middleWares: [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      loggerMiddleware
  ]
})

app.listen();



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
