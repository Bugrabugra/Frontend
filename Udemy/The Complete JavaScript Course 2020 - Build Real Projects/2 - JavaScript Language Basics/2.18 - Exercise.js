let billsJohn = {
  bill: [124, 48, 268, 180, 42],
  tips: [],
  finalPaidAmount: [],
  calcTip: function() {
    let ratio = 0;
    for (let i = 0; i < this.bill.length; i++) {
      switch (true) {
        case (this.bill[i] < 50):
          ratio = 0.2;
          break;
        case (50 <= this.bill[i] && this.bill[i] < 200):
          ratio = 0.15;
          break;
        case (this.bill[i] >= 200):
          ratio = 0.1;
          break;
      }
      this.tips.push(this.bill[i] * ratio);
      this.finalPaidAmount.push(this.tips[i] + this.bill[i]);
    }
  }
};

billsJohn.calcTip();
console.log(billsJohn);

let billsMark = {
  bill: [77, 475, 110, 45],
  tips: [],
  finalPaidAmount: [],
  calcTip: function() {
    let ratio = 0;
    for (let i = 0; i < this.bill.length; i++) {
      switch (true) {
        case (this.bill[i] < 100):
          ratio = 0.2;
          break;
        case (100 <= this.bill[i] && this.bill[i] < 300):
          ratio = 0.10;
          break;
        case (this.bill[i] >= 300):
          ratio = 0.25;
          break;
      }
      this.tips.push(this.bill[i] * ratio);
      this.finalPaidAmount.push(this.tips[i] + this.bill[i]);
    }
  }
};

billsMark.calcTip();
console.log(billsMark);

function calcTips(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total / array.length;
}

let johnAvr = calcTips(billsJohn.tips);
let mikeAvr = calcTips(billsMark.tips);

johnAvr > mikeAvr ?
  console.log("John's family paid the highest bill with " + johnAvr + " against " + mikeAvr) :
  console.log("Mark's family paid the highest bill with " + mikeAvr + " against " + johnAvr);