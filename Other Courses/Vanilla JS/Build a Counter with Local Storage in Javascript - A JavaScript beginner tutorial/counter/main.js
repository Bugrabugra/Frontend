const actions = Array.from(document.querySelectorAll("[data-action]"));

let counter = localStorage.getItem("counter") || 0;

document.querySelector(".counter-value").innerText = counter;

actions.forEach(action => {
  action.addEventListener("click", () => {
    const type = action.dataset.action;
    switch (type) {
      case "increase":
        counter++;
        break;
      case "decrease":
        counter--;
        break;
      case "reset":
        counter = 0;
        break
      case "save":
        localStorage.setItem("counter", counter);
        break;
      case "load":
        counter = localStorage.getItem("counter");
        break;
      case "clear":
        localStorage.clear();
        counter = 0;
        break;
    }

    document.querySelector(".counter-value").innerText = counter;
  });
});

