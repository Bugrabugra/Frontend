// Callbacks & foreach
const myFunc = (callbackFunc) => {
  // Do something
  let value = 50;
  callbackFunc(value);
};

myFunc(value2 => {
  // Do something
  console.log(value2);
});

let people = ["mario", "luigi", "ryu", "shaun", "chun-li"];

const logPerson = ((person, index) => {
  console.log(`${index} - hello ${person}`);
});

people.forEach(logPerson);