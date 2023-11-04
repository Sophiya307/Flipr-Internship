import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import LaureatesPage from './LaureatesPage';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/laureates/:year/:category" component={LaureatesPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;