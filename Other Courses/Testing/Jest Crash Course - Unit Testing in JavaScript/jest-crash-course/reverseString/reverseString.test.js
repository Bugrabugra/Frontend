const reverseString = require("./reverseString");

// is defined
test("reverseString function exists", () => {
  expect(reverseString).toBeDefined();
});

// reverse works
test("String reverses", () => {
  expect(reverseString("hello")).toEqual("olleh")
});

// reverse with uppercase works
test("String reverses with uppercase", () => {
  expect(reverseString("Hello")).toEqual("olleh")
});