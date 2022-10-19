import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";


const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          )
        })}
      </div>
      <div>
        <button onClick={() => setPageNumber((prevState) => prevState - 1)} disabled={pageNumber === 1}>Previous page
        </button>
        <button onClick={() => setPageNumber((prevState) => prevState + 1)} disabled={pageNumber === 4}>Next page
        </button>
      </div>
      {isFetching && "Loading"}
    </>
  );
};

export default PaginatedQueries;
