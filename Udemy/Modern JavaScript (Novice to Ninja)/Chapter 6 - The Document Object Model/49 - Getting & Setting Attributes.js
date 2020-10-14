const link = document.querySelector("a");

console.log(link.getAttribute("href"));
link.setAttribute("href", "https://wwww.thenetninja.co.uk");
link.innerText = "TheNet Ninja Website";

const msg = document.querySelector("p");
console.log(msg.getAttribute("class"));
msg.setAttribute("class", "success");
msg.setAttribute("style", "color: red");
