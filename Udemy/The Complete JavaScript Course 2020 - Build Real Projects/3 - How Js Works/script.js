///////////////////////////////////////
// Lecture: Hoisting
calculateAge(1990);

function calculateAge(year) {
  console.log(2016 - year);
}

let retirement = function(year) {
  console.log(65 - (2016 - year));
};

retirement(1990);

// variables
console.log(age);
var age = 23;

function foo() {
  let age = 65;
  console.log(age);
}

foo();
console.log(age);

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

var a = 'Hello!';
first();

function first() {
  var b = 'Hi!';
  second();

  function second() {
    var c = 'Hey!';
    console.log(a + b + c);
  }
}

// Example to show the difference between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
  var b = 'Hi!';
  second();

  function second() {
    var c = 'Hey!';
    third()
  }
}

function third() {
  var d = 'John';
  console.log(a + d);
}

///////////////////////////////////////
// Lecture: The this keyword
console.log(this);

calculateAge(1985);

function calculateAge(year) {
  console.log(2016 - year);
  console.log(this);
}

let john = {
  name: "John",
  yearOfBirth: 1990,
  calculateAge: function() {
    console.log(this);
    console.log(2016 - this.yearOfBirth);

    function innerFunction() {
      console.log(this);
    }
    innerFunction();
  }
};

john.calculateAge();

let mike = {
  name: "Mike",
  yearOfBirth: 1984
};

mike.calculateAge = john.calculateAge;
mike.calculateAge();