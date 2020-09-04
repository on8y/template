import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' render={props => (<Home {...props} />)}/>
      </Switch>
    );
  }
}

export default App;