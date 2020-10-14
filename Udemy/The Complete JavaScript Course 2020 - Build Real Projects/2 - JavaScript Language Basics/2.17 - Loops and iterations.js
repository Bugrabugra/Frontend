// for loop
for (let i = 0; i < 10; i++) {
  console.log(i);
}

let john = ["John", "Smith", 1990, "designer", false];
for (let i = 0; i < john.length; i++) {
  console.log(john[i]);
}

// while loop
let i = 0;
while (i < john.length) {
  console.log(john[i]);
  i++;
}

// continue and break statements
let mike = ["Mike", "Smith", 1990, "designer", false, "blue"];

for (let i = 0; i < john.length; i++) {
  if (typeof john[i] !== "string") {
    continue;
  }
  console.log(mike[i]);
}

for (let i = 0; i < john.length; i++) {
  if (typeof john[i] !== "string") {
    break;
  }
  console.log(mike[i]);
}

// looping backwards
for (let j = mike.length - 1; j >= 0; j--) {
  console.log(mike[j]);
}

