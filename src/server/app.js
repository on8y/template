"use strict";
// import React from "react";
// import { renderToString } from "react-dom/server";
// import { StaticRouter } from "react-router";
// import App from '../web/pages/home/index';
exports.__esModule = true;
var express_1 = require("express");
// import path from 'path';
// import fs from 'fs';
var app = express_1["default"]();
var port = 5000;
// app.get('^/$', (req, res) => {
//   fs.readFile(path.resolve('../../public/index.html'), 'utf-8', (err, data) => {
//     if (err) {
//       return res.status(500).send('err');
//     }
//     return res.send(data.replace(
//       '<div id="root"></div>',
//       `<div id="root">${renderToString(<App />)}</div>`
//     ));
//   });
// });
// app.use(express.static(path.resolve(__dirname, '../../', 'public')));
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
