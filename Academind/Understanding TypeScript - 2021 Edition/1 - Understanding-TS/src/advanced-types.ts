type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

// ********* SAME **********
// interface Admin {
//   name: string;
//   privileges: string[];
// };
//
// interface Employee {
//   name: string;
//   startDate: Date;
// }
//
// interface ElevatedEmployee extends Admin, Employee {
//
// }


const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable | Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  } else {
    return a + b;
  }
}

const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: {title: "CEO", description: "My own company"}
};

console.log(fetchedUserData?.job?.title);

const userInput = "";
const storedData = userInput || "DEFAULT";
console.log(storedData);

const result = add("Max", "Schwarz");
result.split(" ");

type UnknownEmployee = Employee | Admin;

const printEmployeeInformation = (emp: UnknownEmployee) => {
  console.log("Name: " + emp.name);

  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({name: "Manu", startDate: new Date()});

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();

  if ("loadCargo" in vehicle) {
    vehicle.loadCargo(1000);
  }

  // *********** SAME ************
  // if (vehicle instanceof Truck) {
  //   vehicle.loadCargo(1000);
  // }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse;"
  runningSpeed: number
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
  let speed;

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse;":
      speed = animal.runningSpeed;
      break;
  }

  console.log("Moving at speed: " + speed);
}

moveAnimal({type: "bird", flyingSpeed: 20});

// const userInputElement = <HTMLInputElement>document.getElementById("message-output")!;
const userInputElement = <HTMLInputElement>document.getElementById("message-output")! as HTMLInputElement;
userInputElement.value = "Hi there!";

interface ErrorContainer {
  [prop: string]: string
}

const errorBag: ErrorContainer = {
  email: "Now a valid email",
  username: "Must start with a capital character!"
};