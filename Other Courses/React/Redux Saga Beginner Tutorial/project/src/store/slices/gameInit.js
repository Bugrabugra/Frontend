import { createSlice } from "@reduxjs/toolkit";
import * as stages from "../../utils/constants";
import { fetchQuestionsFail, fetchQuestionsSuccess } from "./game";


const initialState = {
  stage: stages.START_GAME,
  username: ""
};

const gameState = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.username = action.payload.username;
      state.stage = stages.FETCHING_GAME;
    },
    cancelGame: (state, action) => {
      state.stage = stages.START_GAME;
    },
    finishGame: (state, action) => {
      state.stage = stages.END_GAME;
    },
    restartGame: (state, action) => {
      state.stage = stages.START_GAME;
    }
  },
  // other slices actions
  extraReducers: builder => {
    builder
      .addCase(fetchQuestionsSuccess, (state) => {
        state.stage = stages.GAME;
      })
      .addCase(fetchQuestionsFail, (state) => {
        state.stage = stages.START_GAME;
      })
  }
});

export const {startGame, cancelGame, finishGame, restartGame} = gameState.actions;

export default gameState.reducer;