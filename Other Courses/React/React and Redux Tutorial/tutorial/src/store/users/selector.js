import { createSelector } from "reselect";

const getUsers = (state) => {
  return state.users.users;
};

export const getUser = createSelector([getUsers], (users) => {
  console.log("Users output");
  return users.map(user => user.name);
});