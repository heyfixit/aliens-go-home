import { calculateAngle } from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonBalls';
import checkcollisions from './checkCollisions';

export default (state, action) => {
  if (!state.gameState.started) return state;
  let cannonBalls = moveBalls(state.gameState.cannonBalls);
  const mousePosition = action.payload || {
    x: 0,
    y: 0
  };

  const newState = createFlyingObjects(state);

  const now = new Date().getTime();
  let flyingObjects = newState.gameState.flyingObjects.filter(
    object => now - object.createdAt < 4000
  );

  const lostLife = state.gameState.flyingObjects.length > flyingObjects.length;
  let lives = state.gameState.lives;
  if (lostLife) {
    lives--;
  }

  const started = lives > 0;
  if(!started) {
    flyingObjects = [];
    cannonBalls = [];
    lives = 3;
  }

  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  const objectsDestroyed = checkcollisions(cannonBalls, flyingObjects);
  const cannonBallsDestroyed = objectsDestroyed.map(object => object.cannonBallId);
  const flyingDiscsDestroyed = objectsDestroyed.map(object => object.flyingDiscId);

  cannonBalls = cannonBalls.filter(cannonBall => cannonBallsDestroyed.indexOf(cannonBall.id));
  flyingObjects = flyingObjects.filter(flyingDisc => flyingDiscsDestroyed.indexOf(flyingDisc.id));

  const kills = state.gameState.kills + flyingDiscsDestroyed.length;

  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls,
      lives,
      started,
      kills
    },
    angle
  };
};
