import React, { Fragment } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";


const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const {
    isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage
  } = useInfiniteQuery(
    ["colors"],
    fetchColors,
    {
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < 4) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      }
    }
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
        {data?.pages.map((value, index) => {
          return (
            <Fragment key={index}>
              {
                value.data.map((color) => (
                  <h2 key={color.id}>
                    {color.id} {color.label}
                  </h2>
                ))
              }
            </Fragment>
          )
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Fetching..." : null}
      </div>
    </>
  );
};

export default InfiniteQueries;
