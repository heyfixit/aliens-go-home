import React from 'react';
import { skyAndGroundWidth as skyWidth } from '../utils/constants';

export default () => {
  const skyStyle = {
    fill: '#30abef'
  };

  const gameHeight = 1200;
  return (
    <rect
      style={skyStyle}
      x={skyWidth / -2}
      y={100 - gameHeight}
      width={skyWidth}
      height={gameHeight}
    />
  );
};
