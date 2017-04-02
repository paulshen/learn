/* @flow */
import React from 'react';
import Radium from 'radium';

import { UIText } from '../../components/core';

function PostUnit({ post }: { post: Post }) {
  return (
    <div>
      <UIText size={14}>{post.content}</UIText>
    </div>
  );
}

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
