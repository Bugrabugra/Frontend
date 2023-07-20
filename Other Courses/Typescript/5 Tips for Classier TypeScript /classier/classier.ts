type User = { id: number, name: string };

type DB = {
  byId: (table: string, id: number) => User
};

type UserFinder = { findById(id: number): User };

class UserModel implements UserFinder {
  private db: DB

  findById(id: number): User {
    return this.db.byId("user", id);
  }
};

function handleReq(users: UserFinder) {
  users.findById(1);
};

// in source
handleReq(new UserModel());

// in tests
const testUsers = [{ id: 1, name: "test" }];

handleReq({
  findById(id: number): User {
    return testUsers[id]
  }
});

// -----------
class Counter {
  // @ts-ignore
  #value: number = 0;
}

const c = new Counter();

// -----------
class Counter1 {
  constructor(public value: number) {
    this.value = value;
  }
}

const c1 = new Counter1(1);
console.log(c1.value)

// -----------

class Person {
  constructor(public firstName: string, public lastName?: string) {}

  assertsFullName(): asserts this is this & { lastName: string } { // icinde asserts kelimesi
    // gectiginden class disinda kullanilamaz
    if (!this.lastName) {
      throw new Error("no last name");
    }
  }

  hasFullName(): this is this & { lastName: string } {
    return !!this.lastName
  }

  getFullName(this: Person): [string, string] {
    this.assertsFullName();
    return [this.firstName, this.lastName];
  }
};

const p = new Person("Andrew");
const fullName = p.getFullName();

if (p.hasFullName()) {
  //
}

const getFullName = p.getFullName.bind(p);
const fullName1 = getFullName();

