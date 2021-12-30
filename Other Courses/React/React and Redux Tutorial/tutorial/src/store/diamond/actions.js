import { MINE_DIAMOND } from "./actionTypes"

// actions
// const mineDiamond = {
//   type: "MINE_DIAMOND"
// };

// action creator
export const mineDiamond = (increment) => {
  return {
    type: MINE_DIAMOND,
    payload: increment
  }
}