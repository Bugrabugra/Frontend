// Void = undefined + null

const doSomething = (): void => {
  console.log("doSomething");
}

// Never
const doSomething1 = (): never => {
  throw "never";
}

// Unknown

let vAny: any = 10;
let vUnknown: unknown = 10;
let s1: string = vAny;
let s2: string = vUnknown as string; // unknown olduğu için doğrudan type atayamazsın

// console.log(vAny.foo());
// console.log(vUnknown.foo());