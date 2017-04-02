/* @flow */
import React from 'react';
import Radium from 'radium';

const PageBody = Radium(function(props) {
  return <div {...props} style={Styles} />;
})
export default PageBody;

const Styles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: 1080,
  paddingLeft: 80,
  paddingRight: 80,
};
