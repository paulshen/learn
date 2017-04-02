/* @flow */
import React from 'react';
import Radium from 'radium';

export default Radium(function({
  size,
  style,
  ...props
}: {
  size: 12 | 14,
  style?: any,
}) {
  return (
    <div
      {...props}
      style={[
        {
          fontSize: size,
        },
        style,
      ]}
    />
  );
});
