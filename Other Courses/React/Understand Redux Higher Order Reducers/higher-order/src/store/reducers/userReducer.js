const initialState = [];

const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case "ADD_USER":
      return [...state, payload];
    default:
      return state;  
  }
};

export default userReducer;