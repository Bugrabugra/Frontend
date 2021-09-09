var _a;
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
var e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date()
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    else {
        return a + b;
    }
}
var fetchedUserData = {
    id: "u1",
    name: "Max",
    job: { title: "CEO", description: "My own company" }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
var userInput = "";
var storedData = userInput || "DEFAULT";
console.log(storedData);
var result = add("Max", "Schwarz");
result.split(" ");
var printEmployeeInformation = function (emp) {
    console.log("Name: " + emp.name);
    if ("privileges" in emp) {
        console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("Start date: " + emp.startDate);
    }
};
printEmployeeInformation(e1);
printEmployeeInformation({ name: "Manu", startDate: new Date() });
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log("Driving...");
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log("Driving a truck...");
    };
    Truck.prototype.loadCargo = function (amount) {
        console.log("Loading cargo..." + amount);
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
var useVehicle = function (vehicle) {
    vehicle.drive();
    if ("loadCargo" in vehicle) {
        vehicle.loadCargo(1000);
    }
    // *********** SAME ************
    // if (vehicle instanceof Truck) {
    //   vehicle.loadCargo(1000);
    // }
};
useVehicle(v1);
useVehicle(v2);
var moveAnimal = function (animal) {
    var speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse;":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed: " + speed);
};
moveAnimal({ type: "bird", flyingSpeed: 20 });
// const userInputElement = <HTMLInputElement>document.getElementById("message-output")!;
var userInputElement = document.getElementById("message-output");
userInputElement.value = "Hi there!";
var errorBag = {
    email: "Now a valid email",
    username: "Must start with a capital character!"
};
