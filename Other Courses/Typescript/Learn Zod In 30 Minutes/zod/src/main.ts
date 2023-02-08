import { z } from "zod";

const hobbies = ["Programming", "Weight Lifting", "Guitar"] as const;

const UserSchema = z.object({
  username: z.string().min(3),
  age: z.number(),
  birthday: z.date(),
  isProgrammer: z.boolean(),
  hobbies: z.enum(hobbies),
  fiends: z.array(z.string()),
  coords: z.tuple([z.number(), z.number(), z.number().gt(5)]),
  moreCoords: z.tuple([z.string(), z.date()]).rest(z.number()),
  id: z.union([z.string(), z.number()]),
  id2: z.string().or(z.number()),
  id3: z.discriminatedUnion("status", [
    z.object({ status: z.literal("success"), data: z.string() }),
    z.object({ status: z.literal("failure"), error: z.instanceof(Error) })
  ])
});

type User = z.infer<typeof UserSchema>

const user: User = {
  username: "WDS",
  age: 20,
  birthday: new Date(),
  isProgrammer: true,
  hobbies: "Guitar",
  fiends: ["John"],
  coords: [1, 2, 7],
  moreCoords: ["1", new Date(), 2, 3, 4],
  id: "1",
  id2: 2,
  id3: { status: "success", data: "test" }
};

const UserMap = z.record(z.string(), z.number())

const userMap = {
  t: 2,
  r: 1
};

const UserMap2 = z.map(z.string(), z.object({ name: z.string() }));

const userMap2 = new Map([
  ["a", { name: "6" }],
])

const UserSet = z.set(z.number());

const userSet = new Set([1, 2, 3]);

const PromiseSchema = z.promise(z.string());

const p = Promise.resolve("asd");

const brandEmail = z.string().email().refine(val => val.endsWith("gmail.com"), {
  message: "Email must end" +
    " with gmail.com"
});

const email = "b@gmail.com";

const zBoolean = z.boolean().default(false)
const bool = undefined

const zFunction = z.function().args(z.string()).returns(z.number())
const myFunction = (name: string) => name.length;

console.log(UserSchema.safeParse(user).success);
console.log(UserSchema.partial().parse(user));
console.log(UserSchema);
console.log(UserSchema.omit({ username: true }));
console.log(UserMap.parse(userMap));
console.log(UserMap2.parse(userMap2));
console.log(UserSet.parse(userSet));
console.log(PromiseSchema.parse(p));
console.log(brandEmail.parse(email));
console.log(zBoolean.parse(bool))
console.log(zFunction.safeParse(() => myFunction("ahmet")))
