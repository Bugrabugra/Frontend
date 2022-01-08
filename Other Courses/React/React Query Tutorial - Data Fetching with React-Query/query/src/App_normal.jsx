import {useEffect, useState} from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios("https://random.dog/woof.json");
        setData(response.data);
      } catch(error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isError) return (<h1>Error, try again!</h1>);
  if (isLoading) return (<h1>Loading...</h1>);

  return (
    <div>
      <img style={{width: "100%"}} src={data.url} alt=""/>
    </div>
  )
}

export default App
