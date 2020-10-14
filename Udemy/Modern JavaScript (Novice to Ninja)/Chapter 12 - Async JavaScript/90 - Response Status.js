const request = new XMLHttpRequest();
const url = "https://jsonplaceholder.typicode.com/todos/";

request.addEventListener("readystatechange", () => {
  // console.log(request, request.readyState);
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText);
  } else if (request.readyState === 4) {
    console.log("could not fetch the data");
  }
});

request.open("GET", url);
request.send();