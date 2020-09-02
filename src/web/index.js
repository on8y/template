'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
function Home() {
  return (<div>Hello, React!</div>)
}
ReactDOM.hydrate(<Home />, document.getElementById('root'));