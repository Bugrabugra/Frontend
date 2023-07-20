import { useEffect, useState } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";


const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  console.log(endpoint, query)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  // const options = {
  //   method: 'GET',
  //   url: "http://localhost:3500/data"
  // };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch(error) {
      console.log(error)
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, reFetch };
}

export default useFetch;
