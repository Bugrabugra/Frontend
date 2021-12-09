const initialState = [
  {id: 1, first: "Bucky", last: "Roberts", age: 71, description: "Good", thumbnail: "https://i.pravatar.cc/200"},
  {id: 2, first: "Joby", last: "Wasilenko", age: 27, description: "Nice", thumbnail: "https://i.pravatar.cc/100"},
  {id: 3, first: "Madison", last: "Williams", age: 24, description: "Sweet", thumbnail: "https://i.pravatar.cc/300"},
];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;