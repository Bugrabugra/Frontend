const form = document.querySelector(".signup-form");
const feedback = document.querySelector(".feedback");
const usernamePattern = /^[a-zA-Z]{6,12}$/;
// const username = document.querySelector("#username");

form.addEventListener("submit", e => {
  e.preventDefault();
  // console.log(username.value);
  console.log(form.username.value); //Id olanları bu şekilde çekebiliyor
  // Validation
  const username = form.username.value;
  if (usernamePattern.test(username)) {
    // Feedback good info
    feedback.textContent = "that username is valid";
  } else {
    // Feedback bad info
    feedback.textContent = "that username is not valid";
  }
});

// Live feedback
form.username.addEventListener("keyup", e => {
  console.log(e);
  // console.log(e.target.value);
  if (usernamePattern.test(e.target.value)) {
    form.username.setAttribute("class", "success");
  } else {
    form.username.setAttribute("class", "error");
  }
});