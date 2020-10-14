const form = document.querySelector("form");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {"Content-Type": "application/json"}
    });
    if (res.status === 200) {
      console.log("Signup successful");
    }
  } catch (error) {
    console.log(error);
  }
});
