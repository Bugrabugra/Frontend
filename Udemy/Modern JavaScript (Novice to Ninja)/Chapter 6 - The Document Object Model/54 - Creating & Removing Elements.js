const ul = document.querySelector("ul");
// ul.remove();

const button = document.querySelector("button");
button.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = "something new to do";
  ul.prepend(li); // Tepeye
  // ul.append(li); // Alta
});

const items = document.querySelectorAll("li");

items.forEach(item => {
  item.addEventListener("click", e => {
    // e.target.style.textDecoration = "line-through";
    e.target.remove();
  });
});