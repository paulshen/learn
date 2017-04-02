/* @flow */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

import { selectors as userSelectors } from '../../data/user';

class IndexPage extends Component {
  props: {
    loading: boolean,
    isLoggedIn: boolean,
    posts: ?{
      content: string,
      createdAt: string,
    },
  };

  render() {
    if (!this.props.loading && !this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return <div>{JSON.stringify(this.props)}</div>;
  }
}

IndexPage = graphql(
  gql`
  query IndexPage {
    user {
      id
      posts {
        id
        content
        createdAt
      }
    }
  }
`,
  {
    props: ({ data: { loading, user, networkStatus } }) => ({
      loading,
      isLoggedIn: !!user,
      posts: user && user.posts,
    }),
  }
)(IndexPage);

export default IndexPage;
