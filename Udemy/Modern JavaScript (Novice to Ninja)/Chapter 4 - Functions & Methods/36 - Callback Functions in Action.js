// Get a reference to the "ul"
const ul = document.querySelector(".people");
const people = ["mario", "luigi", "ryu", "shaun", "chun-li"];
let html = ``;

people.forEach((person) => {
  // Create html template
  html += `<li style="color: purple">${person}</li>`
});

console.log(html);
ul.innerHTML = html;