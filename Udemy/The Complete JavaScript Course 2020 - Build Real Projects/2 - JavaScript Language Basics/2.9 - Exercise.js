let johnsTeamAvg = (89 + 120 + 103) / 3;
let mikesTeamAvg = (116 + 94 + 123) / 3;
let marysTeamAvg = (97 + 134 + 105) / 3;

if (johnsTeamAvg > mikesTeamAvg && johnsTeamAvg > marysTeamAvg) {
  console.log("John's team won the game!");
} else if (mikesTeamAvg > johnsTeamAvg && mikesTeamAvg > marysTeamAvg) {
  console.log("Mike's team won the game!");
} else if (marysTeamAvg > mikesTeamAvg && marysTeamAvg > johnsTeamAvg) {
  console.log("Mary's team won the game!");
} else {
  console.log("It's a draw!");
}
