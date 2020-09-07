import React from 'react';
import { renderToString } from 'react-dom/server';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { StaticRouter } from 'react-router-dom';
import App from '../web/app';


import express from 'express';
const app: express.Application = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(express.static('build/web'));

app.get('/aaa', (_, res) => {
  let url = path.resolve(__dirname, '../web/index.html');
  fs.readFile(url, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('err');
    }
    console.log('data', data)
    const html = data.replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(
        <StaticRouter>
          <App />
        </StaticRouter>)}</div>`
    );
    console.log(html);
    return res.send(html);
  })
})

app.listen(PORT, () => {
  console.log('started for http://localhost:5000');
})
