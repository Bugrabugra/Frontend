import React from 'react';
import axios from "axios";
import { useQueries, useQuery } from "react-query";


const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallel = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id)
      };
    })
  );

  console.log(queryResults);

  return (
    <div>
      DynamicParallel
    </div>
  );
};

export default DynamicParallel;
