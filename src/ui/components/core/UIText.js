/* @flow */
import React from 'react';
import Radium from 'radium';

const UIText = Radium(function({
  size,
  letterSpacing,
  style,
  ...props
}: {
  size: 12 | 14 | 24,
  letterSpacing?: 0.5 | 1,
  style?: any,
}) {
  return (
    <div
      {...props}
      style={[
        {
          fontSize: size,
          letterSpacing,
        },
        style,
      ]}
    />
  );
});
export default UIText;

export const Title = Radium(function(props) {
  return <UIText {...props} size={24} letterSpacing={1} />;
});
