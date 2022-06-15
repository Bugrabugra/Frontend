import React, { useEffect, useState } from 'react';
import { url } from "../config";


const Fetch = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData.message)
      });
  }, []);

  return (
    <div>
      <img src={data} width={500}/>
    </div>
  );
};

export default Fetch;
