// Listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    // Get data
    db.collection("guides").onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
      setupUI(user)
    }).catch(err => {
      console.log(err.message);
    })
  } else {
    setupUI();
    setupGuides([])
  }
})

// Create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("guides").add({
    title: createForm["title"].value,
    content: createForm["content"].value
  }).then(() => {
    // Close the modal and reset the form
    const modal = document.querySelector("#modal-create");
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  })
})

// Signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // Sign up the user
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Close the register modal and reset the form
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
})

// Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();

  // Log the user out
  auth.signOut().then(() => {});
})

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  // Log the user in
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Close the login modal and reset the form
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
})

