const isPalindrome = require("./isPalindrome");

test("Tacocat returns true", () => {
  expect(isPalindrome("Tacocat")).toBe(true)
})

test("Dave return false", () => {
  expect(isPalindrome("Dave")).toBe(false)
})

