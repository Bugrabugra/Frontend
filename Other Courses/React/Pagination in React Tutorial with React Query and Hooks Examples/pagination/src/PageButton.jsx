import React from 'react';


const PageButton = ({ pg, setPage, isPreviousData }) => {
  return (
    <button onClick={() => setPage(pg)} disabled={isPreviousData}>
      {pg}
    </button>
  );
};

export default PageButton;
