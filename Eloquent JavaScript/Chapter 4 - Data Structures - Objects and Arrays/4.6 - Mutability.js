let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
console.log(object1 == object3);

object1.value = 15;
console.log(object2.value);
console.log(object3.value)

// ************************************
const score = {
  visitors: 0,
  home: 0
};
score.visitors = 1;
