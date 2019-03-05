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
  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  const objectsDestroyed = checkcollisions(cannonBalls, flyingObjects);
  const cannonBallsDestroyed = objectsDestroyed.map(object => object.cannonBallId);
  const flyingDiscsDestroyed = objectsDestroyed.map(object => object.flyingDiscId);

  cannonBalls = cannonBalls.filter(cannonBall => cannonBallsDestroyed.indexOf(cannonBall.id));
  flyingObjects = flyingObjects.filter(flyingDisc => flyingDiscsDestroyed.indexOf(flyingDisc.id));

  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls
    },
    angle
  };
};
