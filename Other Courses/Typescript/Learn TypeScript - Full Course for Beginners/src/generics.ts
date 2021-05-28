const searchStr = "foo";
const _hasSearchedString = any<string>((el: string) => el.contains(searchStr), ["fooo", "bar", "baz"])

const addId = <T extends object>(obj: T) => {
  const id = Math.random().toString(16);
  return {
    ...obj,
    id
  }
}

interface UserInterface3<T, V> {
  name: string;
  data: T;
  meta: V;
}

const user4: UserInterface3<{meta: string}, string> = {
  name: "Jack",
  data: {
    meta: "foo"
  },
  meta: "bar"
}

const user5: UserInterface3<string[]> = {
  name: "John",
  data: ["foo", "bar", "baz"]
}

const result = addId<UserInterface3>(user4);
console.log("result", result);