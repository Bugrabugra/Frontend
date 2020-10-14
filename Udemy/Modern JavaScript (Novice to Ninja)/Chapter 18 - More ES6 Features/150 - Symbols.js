const symbolOne = Symbol("a generic name");
const symbolTwo = Symbol("a generic name");

console.log(symbolOne, symbolTwo, typeof symbolOne);
console.log(symbolOne === symbolTwo);

const ninja = {};
ninja.age = 30;
ninja["belt"] = "orange";
ninja["belt"] = "black";

ninja[symbolOne] = "ryu";
ninja[symbolTwo] = "chun-li";

console.log(ninja);