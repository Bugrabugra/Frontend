const initialState = [];

const articleReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case "ADD_ARTICLE":
      return [...state, payload];
    default:
      return state;
  }
};

export default articleReducer;
