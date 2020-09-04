import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';

import App from './app';
// hydrate
ReactDOM.hydrate(
  <StaticRouter>
    <App />
  </StaticRouter>,
  document.querySelector('root')
  // document.getElementById('root')
);