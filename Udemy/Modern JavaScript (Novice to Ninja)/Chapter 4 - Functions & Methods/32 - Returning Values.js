// Returning values
const speak = function(name = "luigi", time = "night") {
  console.log(`good ${time} ${name}`);
};

const calcArea = function(radius) {
  return 3.14 * radius ** 2;
};

const area = calcArea(5);
console.log(area);
