import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { GraphqlClient, Store } from './data';

class App extends Component {
  render() {
    return (
      <ApolloProvider store={Store} client={GraphqlClient}>
        <div />
      </ApolloProvider>
    );
  }
}

export default App;
