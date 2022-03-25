import './style.css'
import axios from "axios";

const postOne = async () => {
  try {
    const jsonOne = axios.get("https://jsonplaceholder.typicode.comm/posts/10");
    const jsonTwo = axios.get("https://jsonplaceholder.typicode.com/posts/11");
    const jsonThree = axios.get("https://jsonplaceholder.typicode.com/posts/12");
    const jsonFour = axios.get("https://jsonplaceholder.typicode.com/posts/13");

    const promiseAll = await Promise.allSettled([jsonOne, jsonTwo, jsonThree, jsonFour]);

    console.log(promiseAll)

    // console.log(jsonOne)
    // console.log(jsonTwo)
    // console.log(jsonThree)
    // console.log(jsonFour)
  } catch(error) {
    console.log(error);
  }
}

postOne();
