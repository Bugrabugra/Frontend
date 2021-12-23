import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { restartGame } from '../store/slices/gameInit';

const EndGamePage = () => {
  const dispatch = useDispatch();
  const answers = useSelector(state => state.quiz.answers);
  const score = useSelector(state => state.quiz.score);
  
  const restartHandler = () => {
    dispatch(restartGame())
  };
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-purple-500 my-4">Game Over</h1>
      <p className="text-2xl mb-4">
        Your score was <span className="text-purple-500">{score}</span>/10
      </p>
      <Button onClick={restartHandler}>Restart Game</Button>

      <div className="mt-4 p-4">
        {answers.map((answer, index) => (
          <div key={index} className='border-b-2 border-purple-500 flex justify-between bg-white'>
            <p dangerouslySetInnerHTML={{ __html: answer.question }} className='p-2 mr-2'></p>
            <span className={`p-2 ${answer.correctAnswer === answer.answer ? "text-green-500" : "text-red-500"}`}>{answer.answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EndGamePage;