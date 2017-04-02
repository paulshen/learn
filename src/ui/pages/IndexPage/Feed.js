/* @flow */
import React from 'react';
import Radium from 'radium';

import { UIText } from '../../components/core';

const PostUnit = Radium(function({ post }: { post: Post }) {
  return (
    <div style={PostUnit.Styles.Root}>
      <UIText size={14} style={PostUnit.Styles.Content}>{post.content}</UIText>
      <UIText size={12}>{new Date(post.createdAt).toDateString()}</UIText>
    </div>
  );
});
PostUnit.Styles = {
  Root: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
    boxSizing: 'border-box',
    marginBottom: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    width: 360,
  },
  Content: {
    marginBottom: 8,
  },
};

function Feed(
  {
    posts,
  }: {
    posts: Post[],
  }
) {
  return (
    <div>
      {posts.map((post, i) => <PostUnit post={post} key={i} />)}
    </div>
  );
}

export default Radium(Feed);
