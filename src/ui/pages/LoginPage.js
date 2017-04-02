/* @flow */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { GraphqlClient } from '../../data';
import { actions as userActions } from '../../data/user';

class LoginPage extends Component {
  props: {
    signin: (email: string, password: string) => Promise<{
      data: { signinUser: { token: string } },
    }>,
    setUserToken: (token: string) => any,
  };
  state = {
    email: '',
    password: '',
    redirectToIndex: false,
  };

  _onSubmit = async e => {
    e.preventDefault();
    let {
      data: { signinUser: { token } },
    }: { data: { signinUser: { token: string } } } = await this.props.signin(
      this.state.email,
      this.state.password
    );
    this.props.setUserToken(token);
    await GraphqlClient.query({
      query: gql`{ user { id } }`,
      fetchPolicy: 'network-only',
    });
    this.setState({
      redirectToIndex: true,
    });
  };

  render() {
    if (this.state.redirectToIndex) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this._onSubmit}>
        <input
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button>Sign In</button>
      </form>
    );
  }
}

LoginPage = compose(
  graphql(
    gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`,
    {
      props: ({ mutate }) => ({
        signin: (email: string, password: string) =>
          mutate({ variables: { email, password } }),
      }),
    }
  ),
  connect(null, (dispatch: Dispatch) => ({
    setUserToken: (token: string) => dispatch(userActions.setUserToken(token)),
  }))
)(LoginPage);

export default LoginPage;
