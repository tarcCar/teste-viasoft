import React, { Suspense } from 'react';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RouteWithLayout from './components/RotaComLayout';
import setUpAxios from './api';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const browserHistory = createBrowserHistory();
setUpAxios(browserHistory);
const Routes = () => (
  <Router history={browserHistory}>
    <Suspense fallback={<div>Loading...</div>}>
      <Route component={Login} exact path="/login" />
      <RouteWithLayout component={Home} exact path="/" />
    </Suspense>
  </Router>
);

export default Routes;
