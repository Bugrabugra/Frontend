// Add admin cloud function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({email: adminEmail}).then(result => {
    console.log(result);
  })
})

// Listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    })
    // Get data
    db.collection("guides").onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, (err => {
      console.log(err.message);
    }))
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
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value
      })
    }).then(() => {
    // Close the register modal and reset the form
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector(".error").innerHTML = "";
  }).catch(err => {
    signupForm.querySelector(".error").innerHTML = err.message;
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
      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    }).catch(err => {
    loginForm.querySelector(".error").innerHTML = err.message;
  })
})

