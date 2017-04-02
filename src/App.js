/* @flow */
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { GraphqlClient, Rehydrated, Store } from './data';
import IndexPage from './ui/pages/IndexPage';
import LoginPage from './ui/pages/LoginPage';
import './App.css';

class App extends Component {
  state = {
    rehydrated: false,
  };

  componentDidMount() {
    Rehydrated.then(() => {
      this.setState({
        rehydrated: true,
      });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return null;
    }

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
