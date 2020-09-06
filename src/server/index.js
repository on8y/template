// import 'babel-polyfill';
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
// import { StaticRouter, Route } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import routes from '../web/routes.ts';

import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
// import App from "../web/app.tsx";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static("dist/"));

app.get("^/$", (req, res) => {

  if (req.url.indexOf(".") > -1) {
    res.end("");
    return false;
	}
	
	console.log(req.url);
  const branch = matchRoutes(routes, req.url);
  const Component = branch[0].route.component;
	const content = renderToString(<Component/>);

  // const content = renderToString(
  //   <StaticRouter location={req.path} context={{}}>
  //     <Route path="/">
  //       <App />
  //     </Route>
  //   </StaticRouter>
  // );
  const htmlUrl = path.resolve("dist/web/index.html");
  fs.readFile(htmlUrl, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});
