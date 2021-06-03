const userOne = {
  email: 'ryu@ninjas.com',
  name: 'Mario',
  login(){
    console.log(this.email, 'has logged in');
  },
  logout(){
    console.log(this.email, 'has logged out');
  }
};

userOne.login();
userOne.logout();


class User {
  constructor(email, name) {
    this.email = email;
    this.name = name;
    this.score = 0;
  }

  login() {
    console.log(this.email, "has logged in");
    return this;
  }

  logout() {
    console.log(this.email, "has logged out");
    return this;
  }

  updateScore() {
    this.score++;
    console.log(this.email, "score is now", this.score);
    return this;
  }
}

const userTwo = new User("r@gmail.com", "Ryu");
const userThree = new User("y@gmail.com", "Yoshi");

console.log(userTwo);
console.log(userThree);

userTwo.login();
userThree.logout();

userTwo.updateScore().updateScore().logout();

class Admin extends User {
  deleteUser(user) {
    users = users.filter(u => {
      return u.email !== user.email;
    })
  }
}

const admin = new Admin("s@gmail.com", "Shaun");

let users = [userOne, userTwo];

admin.deleteUser(userTwo);
console.log(users);

function User2(email, name) {
  this.email = email;
  this.name = name;
  this.online = false;
}

User2.prototype.login = function(){
  this.online = true;
  console.log(this.email, "has logged in");
}

User2.prototype.logout = function(){
  this.online = true;
  console.log(this.email, "has logged out");
}

function Admin2(...args) {
  User2.apply(this, args);
  this.role = "super admin";
}

Admin2.prototype = Object.create(User2.prototype);

const userFour = new User2("a@gmail.com", "Amy");
const userFive = new User2("c@gmail.com", "Clara");
const admin2 = new Admin2("s@gmail.com", "Shaun");

console.log(userFour, userFive);
userFour.login();

console.log(admin2);
admin2.login();