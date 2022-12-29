const { expect } = require("@jest/globals");
const { createUserController } = require("./simple");
const userService = {
  users: [],
  createUser({ name }) {
    const user = {
      id: this.users.length + 1,
      name
    };
    this.users.push(user);
    return user;
  }
};

describe('update user controller', function() {
  it("should update user", () => {
    const userService = {
      users: [],
      createUser: jest.fn(({ name }) => {
        return {
          id: 1,
          name
        }
      })
    };

    const user = createUserController({ userService, name: "John" });
    createUserController({ name: "Mark" });

    expect(user).toEqual({ user: { id: 1, name: "John" } });
  })
});
