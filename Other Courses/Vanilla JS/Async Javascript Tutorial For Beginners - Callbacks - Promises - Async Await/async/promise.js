const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("got the user");
    // resolve({user: "ed"});
    reject(new Error("user not logged in"));
  }, 2000)
});

promise
  .then(user => {
    console.log(user);
  })
  .catch(error => {
    console.log(error.message);
  })