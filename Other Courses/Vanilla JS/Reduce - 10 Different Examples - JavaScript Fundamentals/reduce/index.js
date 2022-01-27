const people = [
  {id: "1", name: "Leigh", age: 35},
  {id: "2", name: "Jenny", age: 30},
  {id: "3", name: "Heather", age: 28}
];

let result;

// count
result = people.reduce((accumulator, person) => accumulator + 1, 0);

// sum ages
result = people.reduce((accumulator, person) => accumulator + person.age, 0);

// array of names (map)
result = people.reduce((accumulator, person) => [...accumulator, person.name], []);

// convert to id => person lookup (dict)
result = people.reduce((accumulator, person) => {
  return {...accumulator, [person.id]: person};
}, {});

// max age
result = people.reduce((accumulator, person) => {
  if (accumulator == null || person.age > accumulator) {
    return person.age;
  }
  return accumulator;
}, null);

// min age
result = people.reduce((accumulator, person) => {
  if (accumulator == null || person.age < accumulator) {
    return person.age;
  }
  return accumulator;
}, null);

// find by name
result = people.reduce((accumulator, person) => {
  if (accumulator != null) {
    return accumulator;
  }
  if (person.name === "Leigh") {
    return person;
  }
  return null;
}, null);

// all over 18
result = people.reduce((accumulator, person) => {
  if (!accumulator) {
    return false;
  }
  return person.age > 30;
}, true);

// any over 18
result = people.reduce((accumulator, person) => {
  if (accumulator) {
    return true;
  }
  return person.age > 40;
}, false);

console.log(result);
