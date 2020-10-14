const content = document.querySelector("p");

console.log(content.classList);
content.classList.add("error");
content.classList.remove("error");
content.classList.add("success");

const param = document.querySelectorAll("p");
param.forEach(para => {
  // innerText sadece görünürleri listeliyor!!!
  if (para.textContent.includes("error")) {
    para.classList.add("error");
  } else if (para.textContent.includes("success")) {
    para.classList.add("success");
  }
});

const title = document.querySelector(".title");
title.classList.toggle("test");
title.classList.toggle("test");