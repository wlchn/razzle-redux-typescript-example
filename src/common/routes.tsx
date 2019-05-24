import { makeRouteConfig, Route } from 'found';
import React from 'react';
import HelloPage from './layouts/HelloPage';

const routes = (
  <Route path="/">
    <Route Component={HelloPage} />
  </Route>
);
export default makeRouteConfig(routes);
