/* @flow */
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { GraphqlClient, Store } from './data';
import IndexPage from './ui/pages/IndexPage';

class App extends Component {
  render() {
    return (
      <ApolloProvider store={Store} client={GraphqlClient}>
        <IndexPage />
      </ApolloProvider>
    );
  }
}

export default App;
