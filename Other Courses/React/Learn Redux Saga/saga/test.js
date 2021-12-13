function sayHi() {
  return "hi";
}

const result = sayHi();
console.log(result);

function* sayHiGenerator() {
  yield "hey";
  yield "world";
  yield "guys";
  // statements
  return "hi";
}



const resultGenerator = sayHiGenerator();
console.log(resultGenerator.next());
console.log(resultGenerator.next());
console.log(resultGenerator.next());
console.log(resultGenerator.next());

const resultGeneratorForOf = sayHiGenerator();

for (const iterator of resultGeneratorForOf) {
  console.log(iterator)
}

function* newGenerator() {
  yield "something";
  const final = yield "give me value";
  return final;
}

const newGeneratorIt = newGenerator();
console.log(newGeneratorIt.next());
console.log(newGeneratorIt.next());
console.log(newGeneratorIt.next("custom value"));