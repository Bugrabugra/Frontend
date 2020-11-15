// Numbers - Strings
var character = 'mario';
var age = 30;
var isBlackBelt = false;
character = "luigi";
age = 40;
isBlackBelt = true;
var circ = function (diameter) {
    return diameter * Math.PI;
};
console.log(circ(8));
// Arrays
var names = ["luigi", "mario", "yoshi"];
names.push("toad");
// names.push(3);
// names[0] = 3;
// names = "mario"
var numbers = [10, 20, 30, 40];
numbers.push(25);
// numbers.push("shaun");
// numbers[1] = "shaun";
var mixed = ["ken", 4, "chun-li", 8, 9, true];
mixed.push("ryu");
mixed.push(10);
mixed[0] = 5;
// Objects
var ninja = {
    name: "mario",
    belt: "black",
    age: 30
};
ninja.age = 40;
ninja.name = "ryu";
// ninja.age = "30"
// ninja.skills = ["fighting", "sneaking"]
// ninja = {
//   nameeee: "yoshi",
//   belt: "orange",
//   age: 40,
//   skills: []
// }
// Explicit types
var character_;
var age_;
var isLoggedIn;
// age_ = "luigi"
// isLoggedIn = 25;
isLoggedIn = true;
// Arrays
var ninjas = [];
// ninjas = [10, 23]
ninjas = ["yoshi"];
ninjas.push("mario");
// Union types
var mixed_ = [];
mixed_.push("hello");
mixed_.push(20);
mixed_.push(false);
console.log(mixed_);
var uid;
uid = 23;
uid = "mario";
// Objects
var ninjaOne;
ninjaOne = {
    name: "yoshi",
    age: 30
};
var ninjaTwo;
ninjaTwo = {
    name: "mario",
    age: 20,
    beltColor: "black"
};
