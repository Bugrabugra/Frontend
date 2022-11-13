// index signatures

// interface TransactionObj {
//   Pizza: number;
//   Books: number;
//   Job: number
// }

interface TransactionObj {
  Pizza: number;
  Books: number;
  Job: number

  readonly [index: string]: number;
}

const todaysTransactions: TransactionObj = {
  Pizza: 10,
  Books: -5,
  Job: 50
};

console.log(todaysTransactions.Pizza);
console.log(todaysTransactions["Pizza"]);

let prop: string = "Pizza";
console.log(todaysTransactions[prop]);

const todaysNet = (transactions: TransactionObj): number => {
  let total = 0;
  for (const transaction in transactions) {
    total += transactions[transaction];
  }
  return total;
};

console.log(todaysNet(todaysTransactions));
// todaysTransactions.Hamburger = 50;

console.log(todaysTransactions["Dave"]);

/////////////////
interface Student {
  name: string;
  GPA: number;
  classes?: number[];

  [key: string]: number | string | number[] | undefined
}

const student: Student = {
  name: "Doug",
  GPA: 3.5,
  classes: [100, 200]
};

// console.log(student.test);

for (const key in student) {
  console.log(`${key}: ${student[key as keyof Student]}`);
}

Object.keys(student).forEach((key) => {
  console.log(student[key as keyof typeof student]);
});

const logStudentKey = (student: Student, key: keyof Student): void => {
  console.log(`Student ${key}: ${student[key]}`);
};

console.log(logStudentKey(student, "name"));

/////////////////
// interface Incomes {
//   [key: string]: number;
// }

type Streams = "salary" | "bonus" | "sidehustle";
type Incomes = Record<Streams, number>;

const monthlyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250
};

for (const revenue in monthlyIncomes) {
  console.log(monthlyIncomes[revenue as keyof Incomes]);
}
