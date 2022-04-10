import { useEffect, useState } from 'react'
import { hiragana } from "./hirigana";


const App = () => {
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [error, setError] = useState(null);

  const setRandomHiragana = () => {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    setCurrent(randomIndex);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.toLowerCase() === hiragana[current].romanji) {
      setStreak(streak + 1);
      setMaxStreak(Math.max(streak + 1, maxStreak));
      setError(null);

      localStorage.setItem("maxStreak", String(Math.max(streak, maxStreak)));
      localStorage.setItem("streak", String(streak + 1));
    } else {
      setStreak(0);
      setError(`Wrong! The correct answer for ${hiragana[current].hiragana} is ${hiragana[current].romanji}`)

      localStorage.setItem("streak", String(0));
    }

    setInput("");
    setRandomHiragana();
  };

  useEffect(() => {
    setRandomHiragana();
    setStreak(parseInt(localStorage.getItem("streak")) || 0);
    setMaxStreak(parseInt(localStorage.getItem("maxStreak")) || 0);
  }, []);


  return (
    <div className="min-h-screen bg-slate-800 text-white text-center">
      <header className="p-6 mb-8 text">
        <h1 className="text-2xl font-bold uppercase">Hiragana Quiz</h1>
        <div>
          <p>{streak} / {maxStreak}</p>
        </div>
      </header>

      <div className="text-9xl font-bold mb-8 ">
        {hiragana[current].hiragana}
      </div>

      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="block w-24 mx-auto pb-2 bg-transparent border-b-2 border-b-white outline-none text-center text-6xl"
          />
        </form>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  )
}

export default App;
