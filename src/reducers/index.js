import { MOVE_OBJECTS } from '../actions';
import moveObjects from './moveObjects';

const initialState = {
  angle: 45
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_OBJECTS:
      return moveObjects(state, action);
    default:
      return state;
  }
};
