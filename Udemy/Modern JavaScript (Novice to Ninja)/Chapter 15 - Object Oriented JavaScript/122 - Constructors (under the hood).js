// Constructor functions
// class User {
//   constructor(username, email) {
//     // Setup properties of object
//     this.username = username;
//     this.email = email;
//   }
// }

function User(username, email) {
  this.username = username;
  this.email = email;
  this.login = function() {
    console.log(`${this.username} has logged in`);
  }
}

const userOne = new User("mario", "mario@gmail.com");
const userTwo = new User("luigi", "luigi@gmail.com");

console.log(userOne, userTwo);
userOne.login();
