import React from "react";
import { StaticRouter, Switch, Route, Link } from "react-router-dom";

import routes from './routes.ts';


interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <StaticRouter>
      <h1>Layout</h1>
      <Switch>
        {routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              render={item.component}
            ></Route>
          );
        })}
      </Switch>
    </StaticRouter>
  );
};

export default App;
