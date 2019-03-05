import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';
import * as Auth0 from '@digituz/auth0-web';
import io from 'socket.io-client';

Auth0.configure({
  domain: 'dev-ge5-7q6s.auth0.com',
  clientID: 'Ln54QU5dPBqQKnCH1VesOB76bHybCt3e',
  redirectUri: 'http://localhost:3000',
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
  audience: 'https://aliens-go-home.digituz.com.br'
});

class App extends Component {
  componentDidMount() {
    const self = this;

    Auth0.handleAuthCallback();

    Auth0.subscribe(auth => {
      if (!auth) return;

      self.playerProfile = Auth0.getProfile();
      self.currentPlayer = {
        id: self.playerProfile.sub,
        maxScore: 0,
        name: self.playerProfile.name,
        picture: self.playerProfile.picture
      };

      this.props.loggedIn(self.currentPlayer);

      const socket = io('http://localhost:3001', {
        query: `token=${Auth0.getAccessToken()}`
      });

      let emitted = false;

      socket.on('players', players => {
        this.props.leaderboardLoaded(players);

        if (emitted) return;
        socket.emit('new-max-score', {
          id: self.playerProfile.sub,
          maxScore: 120,
          name: self.playerProfile.name,
          picture: self.playerProfile.picture
        });
        emitted = true;
        setTimeout(() => {
          socket.emit('new-max-score', {
            id: self.playerProfile.sub,
            maxScore: 222,
            name: self.playerProfile.name,
            picture: self.playerProfile.picture
          });
        }, 5000);
      });
    });

    setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 10);

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };

    window.onresize();
  }

  trackMouse = event => {
    this.canvasMousePosition = getCanvasPosition(event);
  };

  render() {
    return (
      <Canvas
        currentPlayer={this.props.currentPlayer}
        players={this.props.players}
        angle={this.props.angle}
        trackMouse={this.trackMouse}
        gameState={this.props.gameState}
        startGame={this.props.startGame}
      />
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }),
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
    })
  )
};

App.defaultProps = {
  currentPlayer: null,
  players: null
};

export default App;
