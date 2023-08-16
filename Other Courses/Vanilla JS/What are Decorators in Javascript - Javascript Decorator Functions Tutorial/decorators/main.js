import fetch from 'node-fetch';

// example 1
// using closure to log how many times a function is called
let sum = (...args) => {
  return [...args].reduce((acc, num) => acc + num);
};

const callCounter = (fn) => {
  let count = 0;

  return (...args) => {
    // write to logs, console, db, etc
    console.log(`sum has been called ${count += 1} times`);
    return fn(...args);
  }
};

sum = callCounter(sum);

console.log(sum(2, 3, 4));
console.log(sum(1, 5));
console.log(sum(14, 5));

// example 2
// check for valid data and number of params
let rectangleArea = (length, width) => {
  return length * width;
};

const countParams = (fn) => {
  return (...params) => {
    if (params.length !== fn.length) {
      throw new Error(`Incorrect number of parameters for ${fn.name}`);
    }

    return fn(...params);
  }
};

const requireIntegers = (fn) => {
  const functionName = fn.name;
  return (...params) => {
    params.forEach((param) => {
      if (!Number.isInteger(param)) {
        throw new TypeError(`Params for ${functionName} must be integers`);
      }
    })

    return fn(...params);
  }
};

rectangleArea = countParams(rectangleArea);
rectangleArea = requireIntegers(rectangleArea);

console.log(rectangleArea(20, 30));
// console.log(rectangleArea(20, 30, 40));

// example 3
// decorating an async API call function:
// time data requests during development
let requestData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error);
  }
};

const dataResponseTime = (fn) => {
  return async (url) => {
    console.time("fn");
    const data = await fn(url);
    console.time("fn");
    return data;
  }
};

const myTestFunction = async () => {
  requestData = dataResponseTime(requestData);
  const data = await requestData("https://jsonplaceholder.typicode.com/posts");
  console.log(data);
};

myTestFunction();
