import { makeRouteConfig, Route } from 'found';
import React from 'react';
import HelloPage from './layouts/HelloPage';
import { fetchUser } from './actions/user';
let history: number = 0;

const routes = (
  <Route path="/">
    <Route
      Component={HelloPage}
      getData={async ({ params, context }) => {
        const actions: any[] = [];
        actions.push(fetchUser('wlchn'));
        await handleActions(context, actions);
      }}
    />
  </Route>
);

const isServer = () => {
  return typeof window === 'undefined';
};

const handleActions = async (context, actions) => {
  if (!isServer() && history === 0) {
    history = history + 1;
    return;
  }
  const promises = actions.map(action => context.store.dispatch(action));
  await Promise.all(promises);
  history = history + 1;
};

export default makeRouteConfig(routes);
