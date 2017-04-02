import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class IndexPage extends Component {
  render() {
    return (
      <div>{JSON.stringify(this.props.data)}</div>
    );
  }
}

IndexPage = graphql(gql`
  {
    allPosts {
      id
      content
    }
  }
`)(IndexPage);

export default IndexPage;
