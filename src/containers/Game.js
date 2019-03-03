import { connect } from 'react-redux';

import App from '../App';
import { moveObjects } from '../actions/index';

const mapStateToProps = state => ({
  angle: state.angle
});

const mapDispatchToProps = dispatch => ({
  moveObjects: mousePosition => dispatch(moveObjects(mousePosition))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
