function tipCalculator(bill) {
  switch (true) {
    case (bill < 50):
      return bill * 0.2;
    case (50 <= bill && bill < 200):
      return bill * 0.15;
    case (bill >= 200):
      return bill * 0.1;
  }
}

let bills = [124, 48, 268];
let tips = [tipCalculator(bills[0]),
            tipCalculator(bills[1]),
            tipCalculator(bills[2])];
let finalValues = [bills[0] + tips[0],
                   bills[1] + tips[1],
                   bills[2] + tips[2]];
console.log(finalValues);