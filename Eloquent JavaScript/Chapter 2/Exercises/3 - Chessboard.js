let rowText = "";
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    if ((row + col) % 2 === 0){
      rowText += " "
    }
    else rowText += "#"
  }
  rowText += "\n"
}

console.log(rowText);

