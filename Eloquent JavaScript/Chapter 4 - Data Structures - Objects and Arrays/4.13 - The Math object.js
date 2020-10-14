function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}

console.log(randomPointOnCircle(2));
console.log(Math.random());
console.log(Math.random());
console.log(Math.floor(Math.random() * 10));