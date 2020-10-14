// Primitives
let a = 23;
let b = a;

a = 46;
console.log(a);
console.log(b);

// Objects
let obj1 = {
  name: "John",
  age: 26
};

let obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions
let age = 27;
let obj = {
  name: "Jonas",
  city: "Lisbon"
};

function change(a, b) {
  a = 30;
  b.city = "San Fransisco";
}

change(age, obj);
console.log(age);
console.log(obj.city);