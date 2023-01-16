// sometimes, you'll need to override the types inside
// the generic function with an assertion. That's ok!

const typedObjectKeys = <TObj extends {}>(
  obj: TObj
) => {
  return Object.keys(obj) as Array<keyof TObj>;
};

const result3 = typedObjectKeys({
  name: "John",
  age: 30
});
