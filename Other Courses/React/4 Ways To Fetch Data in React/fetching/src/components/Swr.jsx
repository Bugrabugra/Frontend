import React from 'react';
import { url } from "../config";
import useSWR from "swr";


const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Swr = () => {
  const { data, error } = useSWR(url, fetcher, { suspense: true })

  if (error) {
    return <h1>There was an error</h1>
  }
  
  return (
    <div>
      <img src={data.message} width={500}/>
    </div>
  );
};

export default Swr;
