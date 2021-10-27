const functions = require("./functions");


// to be
test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

// not to be
test("Adds 2 + 2 to NOT equal 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// to be null
test("Should be NULL", () => {
  expect(functions.isNull()).toBeNull();
});

// to be undefined
test("Should be UNDEFINED", () => {
  expect(functions.isUndefined()).toBeUndefined();
});

// to be falsy - 0, false, undefined, null
test("Should be falsy", () => {
  expect(functions.checkValue(null)).toBeFalsy();
});

// to be equal
test("Should be Brad Traversy object", () => {
  expect(functions.createUser()).toEqual({
    firstName: "Brad",
    lastName: "Traversy"
  });
});

// less than and greater than
test("Should be under 1600", () => {
  const load1 = 800;
  const load2 = 700;
  expect(load1 + load2).toBeLessThan(1600);
});

// regex
test("There is no 'I' in 'team'", () => {
  expect("team").not.toMatch(/I/);
});

// arrays
test("Admin should be in usernames", () => {
  const usernames = ["john", "karen", "admin"];
  expect(usernames).toContain("admin");
});

// working with async data
// promise
test("User fetched name should be Leanne Graham", done => {
  functions.fetchUser()
    .then(data => {
      expect(data.name).toEqual("Leanne Graham");
      done();
    })
    .catch(error => {
      done(error);
    })
});

// working with async data
// async/await
test("User fetched name should be Leanne Graham", async () => {
  const result = await functions.fetchUser();
  expect(result.name).toEqual("Leanne Graham");
})