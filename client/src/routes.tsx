import React, { Suspense } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Routes = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Route component={Home} exact path="/" />
    </Suspense>
  </BrowserRouter>
);

export default Routes;
