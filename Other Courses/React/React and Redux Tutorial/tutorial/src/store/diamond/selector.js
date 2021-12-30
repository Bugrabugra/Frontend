import { createSelector } from "reselect";

export const getDiamonds = (state) => {
  return state.diamond.diamonds;
};

export const getDiamond = createSelector([getDiamonds], (diamonds) => {
  console.log("Diamond output");
  return diamonds;
});