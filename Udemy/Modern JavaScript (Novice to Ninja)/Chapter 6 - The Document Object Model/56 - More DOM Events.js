const copy = document.querySelector(".copy-me");
copy.addEventListener("copy", () => {
  console.log("Oi! My content is copyright!");
});

const box = document.querySelector(".box");
box.addEventListener("mousemove", e => {
  // console.log(e.offsetX, e.offsetY);
  box.textContent = `X pos - ${e.offsetX} Y pos - ${e.offsetY}`
});

document.addEventListener("wheel", e => {
  console.log(e.pageX, e.pageY);
});