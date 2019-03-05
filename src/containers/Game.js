import { connect } from 'react-redux';

import App from '../App';
import {
  shoot,
  leaderboardLoaded,
  loggedIn,
  moveObjects,
  startGame
} from '../actions/index';

const mapStateToProps = state => ({
  angle: state.angle,
  gameState: state.gameState,
  players: state.players,
  currentPlayer: state.currentPlayer
});

const mapDispatchToProps = dispatch => ({
  shoot: mousePosition => dispatch(shoot(mousePosition)),
  moveObjects: mousePosition => dispatch(moveObjects(mousePosition)),
  startGame: () => dispatch(startGame()),
  leaderboardLoaded: players => dispatch(leaderboardLoaded(players)),
  loggedIn: player => dispatch(loggedIn(player))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
