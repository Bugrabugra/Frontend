let firstName = "John";
let age = 21;

if (age < 13) {
  console.log(firstName + " is a boy.")
} else if (13 <= age && age < 20) {
  console.log(firstName + " is a teenager.")
} else if (20 < age && age < 30) {
  console.log(firstName + " is a young man.")
} else {
  console.log(firstName + " is a man.")
}
