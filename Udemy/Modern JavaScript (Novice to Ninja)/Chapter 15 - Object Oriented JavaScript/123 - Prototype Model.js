function User(username, email) {
  this.username = username;
  this.email = email;
}

User.prototype.login = function() {
  console.log(`${this.username} has logged in`);
  return this;
};

User.prototype.logout = function() {
  console.log(`${this.username} has logged out`);
  return this;
};

const userOne = new User("mario", "mario@gmail.com");
const userTwo = new User("luigi", "luigi@gmail.com");

console.log(userOne, userTwo);
userOne.login().logout();