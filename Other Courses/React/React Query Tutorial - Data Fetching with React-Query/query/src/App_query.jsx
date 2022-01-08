import axios from "axios";
import './App.css'
import { useQuery } from "react-query";


function App_query() {
  const {isLoading, error, data} = useQuery("dogs", () => axios("https://random.dog/woof.json"))

  if (error) {
    return (<h1>Error: {error.message} try again!</h1>);
  }
  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

  return (<div>
    <img style={{width: "100%"}} src={data.data.url} alt=""/>
  </div>)
}

export default App_query
