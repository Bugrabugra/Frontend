import React from 'react';
import { useSelector } from 'react-redux';
import * as stages from "../utils/constants";
import EndGamePage from './EndGamePage';
import FetchingPage from './FetchingPage';
import GamePage from './GamePage';
import StartGamePage from './StartGamePage';

const MainPage = () => {
  const currentStage = useSelector(state => state.gameState.stage);
  
  let displayedPage;
  
  switch (currentStage) {
    case stages.START_GAME:
      displayedPage = <StartGamePage/>;
      break;
    case stages.FETCHING_GAME:
      displayedPage = <FetchingPage/>;
      break;
    case stages.GAME:
      displayedPage = <GamePage/>;
      break;
    case stages.END_GAME:
      displayedPage = <EndGamePage/>;
      break;
    default:
      break;
  }
  
  return (
    <div className='font-mono bg-purple-50 min-h-screen'>
      <h1 className='bg-purple-500 text-white p-4 text-2xl text-center uppercase'>
        Redux Saga Quiz Game
      </h1>
      {displayedPage}
      </div>
  );
}

export default MainPage;
