import { useEffect, useState } from "react";

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) setError(true);
        else setData(res);
      })
      .catch((err) => setError(true))
      .finally(() => setIsLoading(false));
  }, []);
  
  return {data, isLoading, error};
};

export default useFetch;