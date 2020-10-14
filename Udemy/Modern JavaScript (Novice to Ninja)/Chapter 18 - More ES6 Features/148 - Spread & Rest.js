// Rest parameter
const double = (...nums) => {
  // Do something
  console.log(nums);
  return nums.map(num => num*2);
};

const result = double(1, 3, 5, 7, 9);
console.log(result);

// Spread syntax (arrays)
const people = ["shaun", "ryu", "crystal"];
const members = ["mario", "chun-li", ...people];
console.log(members);

// Spread syntax (objects)
const person = {name: "shaun", age: 30, job: "net ninja"};
const personClone = {...person, location: "manchester"};
console.log(personClone);