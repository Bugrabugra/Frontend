import { z } from "zod";

const schema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be string"
  }),
  age: z.number(),
  isAlive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string()
  })
}).strict()

function createUser(props) {
  const result = schema.parse(props);
  return result;
}

type CreateUserInput = z.infer<typeof schema>

const payload: CreateUserInput = {
  name: "John",
  age: 30,
  isAlive: true,
  hobbies: ["coding", "reading"],
  address: {
    street: "123 Main St"
  },
  // @ts-ignore
  isUnknown: true
}


const result = createUser(payload)
console.log(JSON.stringify(result, null, 2))
