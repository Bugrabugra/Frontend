const form = document.querySelector(".signup-form");
const feedback = document.querySelector(".feedback");
// const username = document.querySelector("#username");

form.addEventListener("submit", e => {
  e.preventDefault();
  // console.log(username.value);
  console.log(form.username.value); //Id olanları bu şekilde çekebiliyor
  // Validation
  const username = form.username.value;
  const usernamePattern = /^[a-zA-Z]{6,12}$/
  if (usernamePattern.test(username)) {
    // Feedback good info
    feedback.textContent = "that username is valid";
  } else {
    // Feedback bad info
    feedback.textContent = "that username is not valid";
  }
});
