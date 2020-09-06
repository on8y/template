// import 'babel-polyfill';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import App from '../web/pages/app.tsx';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('dist/'));

app.get('^/$', (req, res) => {
	
	const content = renderToString(<App />);
	const url = path.resolve('dist/web/index.html');
	fs.readFile(url, 'utf8', (err, data) => {
		if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
		}
		return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${content}</div>`
      )
    );
	});
});

app.listen(PORT, () => {
	console.log(`服务器已启动：http://localhost:${PORT}`)
});

//npm-run-all --parallel dev:*