/* @flow */
import React from 'react';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import * as user from './user';

const networkInterface = createNetworkInterface(
  'https://api.graph.cool/simple/v1/cj0y20quf2p7t0178ok9s4wp2'
);

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      // get the authentication token from local storage if it exists
      let userToken = user.selectors.getUserToken(Store.getState());
      if (userToken) {
        req.options.headers.authorization = `Bearer ${userToken}`;
      }
      next();
    },
  },
]);

export const GraphqlClient = new ApolloClient({
  networkInterface,
});

export const Store = createStore(
  combineReducers({
    apollo: GraphqlClient.reducer(),
    user: user.reducer,
  }),
  compose(
    applyMiddleware(GraphqlClient.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    autoRehydrate()
  )
);

export const Rehydrated = new Promise((resolve, reject) => {
  persistStore(
    Store,
    {
      whitelist: ['user'],
    },
    resolve
  );
});
