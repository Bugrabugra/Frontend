import { MINE_DIAMOND } from "./actionTypes";

const initialState = {
  diamonds: 0,
};

const diamondReducer = (state = initialState, action) => {
  switch (action.type) {
    case MINE_DIAMOND:
      return {
        ...state,
        diamonds: state.diamonds + action.payload
      };
    default:
      return state;
  }
};

export default diamondReducer;