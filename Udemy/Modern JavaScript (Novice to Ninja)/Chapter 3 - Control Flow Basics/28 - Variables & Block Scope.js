// Variables & block scope
let age = 30;

if (true) {
  let age = 40;
  let name = "shaun";
  console.log("inside 1st code block:", age, name);

  if (true) {
    console.log("inside 2nd code block:", age);
    var test = "hello";
  }
}

console.log("outside code block:", age, name, test);