import { calculateAngle } from '../utils/formulas';

export default (state, action) => {
  if (!action.payload) return state;
  const { x, y } = action.payload;
  const angle = calculateAngle(0, 0, x, y);
  return {
    ...state,
    angle
  };
};
