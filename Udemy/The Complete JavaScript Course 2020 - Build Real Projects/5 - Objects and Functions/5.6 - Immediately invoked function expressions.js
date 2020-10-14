// function game() {
//   let score = Math.random() * 10;
//   console.log(score >= 5);
// }
//
// game();

(function () {
  let score = Math.random() * 10;
  console.log(score >= 5);
})();


(function (goodLuck) {
  let score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);