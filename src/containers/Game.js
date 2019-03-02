import { connect } from 'react-redux';

import App from '../App';

const mapStateToProps = state => ({
  message: state.message
});

export default connect( mapStateToProps)(App);
