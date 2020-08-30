
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import './global.css';
import { hot } from "react-hot-loader/root";

import HomePage from './pages/home';
import MyPage from './pages/my';
import ToolPage from './pages/tool';


const routes = [
  {
    label: '工具页',
    path: "/",
    exact: true,
    component: ToolPage
  }, {
    label: '我的',
    path: "/my",
    component: MyPage,
  }, {
    label: '主页',
    path: "/my",
    component: HomePage,
  }
];

function App() {
  return (<Router>
    {/* <ul>
      {routes.map((item, index) => {
        return <li key={index}><Link to={item.path}>{item.label}</Link></li>
      })}
    </ul> */}
    <div>
      <Switch>
        {routes.map((item, index) => {
          return <Route key={index} exact={item.exact} path={item.path}><item.component /></Route>
        })}
      </Switch>
    </div>
  </Router>);
}

export default hot(App);