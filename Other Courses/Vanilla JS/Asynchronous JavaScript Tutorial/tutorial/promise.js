const getTodos = (resource, callback) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      // console.log(request, request.readyState);
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText)
        resolve(data);
      } else if (request.readyState === 4) {
        reject("error getting resource");
      }
    })

    request.open("GET", resource);
    request.send();
  });
};

getTodos("todos/luigi.json")
  .then(data => {
    console.log("promise 1 resolved: ", data);
    return getTodos("todos/mario.json");
  })
  .then(data => {
    console.log("promise tutorial resolved: ", data);
    return getTodos("todos/shaun.json");
  })
  .then(data => {
    console.log("promise 3 resolved: ", data);
  })
  .catch(error => {
    console.log("promise rejected: ", error);
  })

// Promise example
const getSomething = () => {
  return new Promise((resolve, reject) => {
    // fetch something
    resolve("some data");
    // reject("some error");
  });
}

// getSomething().then(data => {
//   console.log(data);
// }, error => {
//   console.log(error);
// })

getSomething()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  })


