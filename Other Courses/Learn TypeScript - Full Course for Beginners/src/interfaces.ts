interface UserInterface {
  name: string;
  age?: number;
  getMessage(): string;
}

const user1: UserInterface = {
  name: "Monster",
  age: 30,
  getMessage(): string {
    return "Hello" + name;
  }
}

const user2: UserInterface = {
  name: "Jack",
  getMessage(): string {
    return "Hello" + name;
  }
}

console.log(user1.getMessage())