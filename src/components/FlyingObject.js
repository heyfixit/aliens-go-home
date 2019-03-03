import React from 'react';
import PropTypes from 'prop-types';
import FlyingObjectBase from './FlyingObjectBase';
import FlyingObjectTop from './FlyingObjectTop';

const FlyingObject = props => {
  return (
    <g>
      <FlyingObjectBase position={props.position} />
      <FlyingObjectTop position={props.position} />
    </g>
  );
};

FlyingObject.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  })
};

export default FlyingObject;
