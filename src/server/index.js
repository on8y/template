import React from "react";
import ReactDOMServer from "react-dom/server";
// import { StaticRouter } from "react-router";

const fs = require("fs");
const path = require("path");

import App from '../web/index';

module.exports = function (app) {
  app.get('^/$', (req, res) => {
    fs.readFile(path.resolve('../web/index.html'), 'utf-8', (err, data) => {
      if(err) {
        return res.status(500).send('err');
      }
      return res.send(data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      ));
    })
  })
}