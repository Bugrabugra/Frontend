// Reduce method
const scores = [10, 20, 60, 40, 70, 90, 30];
const results = scores.reduce((acc, curr) => {
  if (curr > 50) {
    acc++;
  }
  return acc;
}, 0);

console.log(results);

const scores2 = [
  {player: 'mario', score: 50},
  {player: 'yoshi', score: 30},
  {player: 'mario', score: 70},
  {player: 'crystal', score: 60},
  {player: 'mario', score: 20},
  {player: 'yoshi', score: 30},
  {player: 'mario', score: 90},
  {player: 'crystal', score: 60}
];

const marioTotal = scores2.reduce((acc, curr) => {
  if (curr.player === "mario") {
    acc += curr.score;
  }
  return acc;
}, 0);

console.log(marioTotal);