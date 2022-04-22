interface MyUser {
  name: string;
  id: number;
  email?: string;
  phone?: string;
}

type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides
  }
};

console.log(merge({ name: "Jack", id: 2, email: "email@test.com" }, { name: "Bugra" }))

// --------------------------
type RequiredMyUser = Required<MyUser>;

// --------------------------
type JustEmailAndName = Pick<MyUser, "email" | "name">;

// --------------------------
type UserWithoutID = Omit<MyUser, "id">;

const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutID> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [v.id]: other
    }
  }, {});
}

console.log(mapById([{ id: 2, name: "Mr. Foo" }, { id: 2, name: "Mrs. Baz" }]))
