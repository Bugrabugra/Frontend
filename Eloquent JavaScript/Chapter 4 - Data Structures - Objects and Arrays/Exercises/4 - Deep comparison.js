function deepEqual(a, b) {
  let bool = true;
  for (const entryA of Object.keys(a)) {
    if (a[entryA] !== b[entryA]) {
      bool = false;
    }
  }
  return bool;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true



