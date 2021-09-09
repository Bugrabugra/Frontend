// Vanilla Js
window.onload = () => {
  const http = new XMLHttpRequest();

  http.onreadystatechange = () => {
    if (http.readyState === 4 && http.status === 200) {
    }
  };

  http.open("GET", "data/tweets.json", true);
  http.send();
};
