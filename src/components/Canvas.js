import React from 'react';

export default () => {
  const style = {
    border: '1px solid black'
  };

  return (
    <svg id="aliens-go-home-canvas" preserveAspectRatio="xMaxYMax none" style={style} >
      <circle cx={0} cy={0} r={50} />
    </svg>
  );
};
