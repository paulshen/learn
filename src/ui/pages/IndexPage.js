/* @flow */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { compose } from 'redux';

import { UIText } from '../components/core';
import { selectors as userSelectors } from '../../data/user';

class IndexPage extends Component {
  props: {
    loading: boolean,
    isLoggedIn: boolean,
    posts: ?{
      content: string,
      createdAt: string,
    },
    userId: ?string,
    createPost: (content: string, userId: string) => Promise<any>,
    refetch: () => void,
  };
  state = {
    content: '',
  };

  _onContentChange = e => {
    this.setState({ content: e.target.value });
  };

  _onSubmit = async e => {
    e.preventDefault();
    const { userId } = this.props;
    if (userId) {
      await this.props.createPost(this.state.content, userId);
      this.props.refetch();
    }
  };

  render() {
    if (!this.props.loading && !this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <textarea
            value={this.state.content}
            onChange={this._onContentChange}
          />
          <button>Add</button>
        </form>
        <UIText size={14}>{JSON.stringify(this.props)}</UIText>
      </div>
    );
  }
}

IndexPage = compose(
  graphql(
    gql`{
    user {
      id
      posts { id content createdAt }
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
