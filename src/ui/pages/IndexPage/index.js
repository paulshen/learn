/* @flow */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { compose } from 'redux';

import { PageBody, Title } from '../../components/core';
import { selectors as userSelectors } from '../../../data/user';
import AddForm from './AddForm';
import Feed from './Feed';

class IndexPage extends Component {
  props: {
    loading: boolean,
    isLoggedIn: boolean,
    posts: ?(Post[]),
    userId: ?string,
    createPost: (content: string, userId: string) => Promise<any>,
    refetch: () => void,
  };

  _onFormAdd = async (content: string) => {
    const { userId } = this.props;
    if (userId) {
      await this.props.createPost(content, userId);
      this.props.refetch();
    }
  };

  render() {
    const { loading, isLoggedIn, posts } = this.props;

    if (!loading && !isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <PageBody>
        <Title>What did you learn today?</Title>
        <AddForm onFormAdd={this._onFormAdd} />
        {posts && <Feed posts={posts} />}
      </PageBody>
    );
  }
}

IndexPage = compose(
  graphql(
    gql`{
    user {
      id
      posts(orderBy: createdAt_DESC) { id content createdAt }
    }
  }`,
    {
      props: ({ data: { loading, user, refetch } }) => ({
        loading,
        isLoggedIn: !!user,
        userId: user && user.id,
        posts: user && user.posts,
        refetch,
      }),
    }
  ),
  graphql(
    gql`mutation createPost($content: String!, $userId: ID!) {
      createPost(content: $content, userId: $userId) { id }
    }`,
    {
      props: ({ mutate, ownProps }) => ({
        createPost: (content: string, userId: string) =>
          mutate({
            variables: { content, userId },
          }),
      }),
    }
  )
)(IndexPage);

export default IndexPage;
