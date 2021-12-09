import {useSelector} from "react-redux";


function App() {
  const users = useSelector(state => state.users);

  return (
    <div className="App">
      {users.map(user => <p key={user.id}>{user.first}</p>)}
    </div>
  )
}

export default App
