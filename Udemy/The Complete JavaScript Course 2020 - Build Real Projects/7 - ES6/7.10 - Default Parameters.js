// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
  
  lastName === undefined ? lastName = "Smith" : lastName = lastName;
  nationality === undefined ? nationality = "American" : nationality = nationality;

  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

var john = new SmithPerson("John", 1990);
console.log(john);

var emily = new SmithPerson("Emily", 1983, "Diaz", "Spanish");
console.log(emily);

// ES6
function BrownPerson(firstName, yearOfBirth, lastName = "Smith", nationality = "American") {

  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

var john = new BrownPerson("John", 1990);
console.log(john);

var emily = new BrownPerson("Emily", 1983, "Diaz", "Spanish");
console.log(emily);