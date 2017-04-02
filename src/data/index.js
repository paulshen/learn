/* @flow */
import React from 'react';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const networkInterface = createNetworkInterface('https://api.graph.cool/simple/v1/cj0y20quf2p7t0178ok9s4wp2');

export const GraphqlClient = new ApolloClient({
  networkInterface,
});

export const Store = createStore(
  combineReducers({
    apollo: GraphqlClient.reducer(),
  }),
  // initial state
  {},
  compose(
    applyMiddleware(GraphqlClient.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
