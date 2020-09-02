const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const port = 5000;

const renderReact = require('./index');

renderReact(app);

app.use(express.static(path.resolve(__dirname, '../../', 'public')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});