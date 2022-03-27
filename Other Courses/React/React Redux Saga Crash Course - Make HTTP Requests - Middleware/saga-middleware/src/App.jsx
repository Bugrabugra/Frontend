import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { getUsers, petDecrement, petIncrement } from "./actions";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(getUsers());
  }, []);


  return (
    <div className="App">
      <h1>Welcome to React Redux Crash Course 2021</h1>
      {loading && <h2>Loading...</h2>}
      {error && !loading && <h2>{error}</h2>}
      {users && users.map((user, index) => <h1 key={index}>{user.name}</h1>)}
    </div>
  )
}

export default App
