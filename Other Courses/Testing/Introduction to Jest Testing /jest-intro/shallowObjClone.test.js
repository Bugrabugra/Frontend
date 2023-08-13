const shallowObjClone = require("./shallowObjClone");

test("Create a clone of object parameter", () => {
  const myObj = { person: "Hitchhiker", number: 42 };
  expect(shallowObjClone(myObj)).toStrictEqual(myObj);
})
