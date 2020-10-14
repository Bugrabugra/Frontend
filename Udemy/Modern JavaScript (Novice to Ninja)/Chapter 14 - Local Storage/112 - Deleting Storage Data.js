// Store data in local storage
localStorage.setItem("name", "mario");
localStorage.setItem("age", 50);

// Get data from local storage
let name = localStorage.getItem("name");
let age = localStorage.getItem("age");

console.log(name, age);

// Deleting data from local storage
// localStorage.removeItem("name");
localStorage.clear();

name = localStorage.getItem("name");
age = localStorage.getItem("age");

console.log(name, age);
