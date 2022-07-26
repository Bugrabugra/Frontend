import { useState, useEffect } from "react";
import { getPostsPage } from "../api/axios.js";


const usePosts = (pageNum = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPage(pageNum, { signal })
      .then((data) => {
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (signal.aborted) {
          return;
        }
        setIsError(true);
        setError({ message: error.message });
      })

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage }
};

export default usePosts;
