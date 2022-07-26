import React, { useState } from 'react';
import { useQuery } from "react-query";
import { getUsersPage } from "./api/axios.js";
import User from "./User.jsx";
import PageButton from "./PageButton.jsx";


const Example2 = () => {
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, data: users, isFetching, isPreviousData } = useQuery(
    ["/users", page],
    () => getUsersPage(page), {
      keepPreviousData: true
    }
  );

  console.log(users)

  if (isLoading) {
    return <p>Loading Users...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  const content = users.data.map((user) => <User key={user.id} user={user}/>)
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);
  const pagesArray = Array(users.total_pages).fill().map((_, index) => index + 1);

  const nav = (
    <nav className="nav-ex2">
      <button onClick={prevPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
      {pagesArray.map((pg) => <PageButton key={pg} pg={pg} setPage={setPage} isPreviousData={isPreviousData}/>)}
      <button onClick={nextPage} disabled={isPreviousData || page === users.total_pages}>&gt;&gt;</button>
    </nav>
  );

  return (
    <>
      {nav}
      {isFetching && <span className="loading">Loading...</span>}
      {content}
    </>
  );
};

export default Example2;
