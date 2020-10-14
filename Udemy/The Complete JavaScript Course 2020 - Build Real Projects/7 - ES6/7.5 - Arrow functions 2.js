// ES5
let box5 = {
  color: "green",
  position: 1,
  clickMe: function() {
    var self = this;
    document.querySelector(".green").addEventListener("click", function() {
      var str = "This is box number " + self.position + " and it is " + self.color;
      alert(str);
    })
  }
};

// box5.clickMe();

// ES6
const box6 = {
  color: "green",
  position: 1,
  clickMe: function() {
    document.querySelector(".green").addEventListener("click", () =>  {
      var str = "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    })
  }
};

// box6.clickMe();

const box66 = {
  color: "green",
  position: 1,
  clickMe: function() {
    document.querySelector(".green").addEventListener("click", () =>  {
      var str = "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    })
  }
};

// box66.clickMe();

// ES5
function Person(name) {
  this.name = name;
}

Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(el) {
    return this.name + " is friends with " + el;
  }.bind(this));
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("John").myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends) {
  var arr = friends.map(el =>
    `${this.name} is friends with ${el}`
  );
  console.log(arr);
};

var friends6 = ["Bob", "Jane", "Mark"];
new Person("Mike").myFriends6(friends6);
