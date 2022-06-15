import React, { useEffect, useState } from 'react';
import axios from "axios";
import { url } from "../config";


const Axios = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data.message);
      })
  }, []);

  return (
    <div>
      <img src={data} width={500}/>
    </div>
  );
};

export default Axios;
