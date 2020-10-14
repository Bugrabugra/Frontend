const request = new XMLHttpRequest();
const url = "https://jsonplaceholder.typicode.com/todos/";

request.addEventListener("readystatechange", () => {
  // console.log(request, request.readyState);
  if (request.readyState === 4) {
    console.log(request.responseText);
  }
});

request.open("GET", url);
request.send();