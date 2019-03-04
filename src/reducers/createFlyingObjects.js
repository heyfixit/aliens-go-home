import {
  createInterval,
  flyingObjectStarterYAxis,
  maxFlyingObjects,
  flyingObjectStarterPositions
} from '../utils/constants';

export default state => {
  if (!state.gameState.started) return state; // game not running

  const now = new Date().getTime();
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject =
    now - lastObjectCreatedAt.getTime() > createInterval &&
    flyingObjects.length < maxFlyingObjects;

  if (!createNewObject) return state; // no need ot create objects now

  const id = new Date().getTime();

  const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects);
  const flyingObjectPosition = flyingObjectStarterPositions[predefinedPosition];
  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectStarterYAxis
    },
    createdAt: new Date().getTime(),
    id
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [...state.gameState.flyingObjects, newFlyingObject],
      lastObjectCreatedAt: new Date()
    }
  };
};
