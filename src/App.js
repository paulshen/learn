/* @flow */
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { GraphqlClient, Store } from './data';
import IndexPage from './ui/pages/IndexPage';
import LoginPage from './ui/pages/LoginPage';

class App extends Component {
  render() {
    return (
      <ApolloProvider store={Store} client={GraphqlClient}>
        <BrowserRouter>
          <div>
            <Route path="/login" component={LoginPage} />
            <Route exact={true} path="/" component={IndexPage} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
