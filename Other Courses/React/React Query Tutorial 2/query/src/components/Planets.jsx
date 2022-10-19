import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";


const fetchPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  // const {data, status} = useQuery(["planets", page], () => fetchPlanets(page));
  const {data, status} = useQuery(["planets", page], () => fetchPlanets(page));

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && (
        <div>Loading data...</div>
      )}

      {status === "error" && (
        <div>Error fetching data</div>
      )}

      {status === "success" && (
        <>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>

          <span>{page}</span>

          <button
            onClick={() => setPage(prev =>  (!data || !data.next ? prev : prev + 1))}
            disabled={!data || !data.next}
          >
            Next page
          </button>

          <div>
            {data.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
          </div>
        </>

      )}
    </div>
  )
};

export default Planets;
