// Find method
const scores = [10, 5, 0, 40, 60, 10, 20, 70];
const firstHighScore = scores.find((score, index, obj) => {
  return score > 50;
});

console.log(firstHighScore);