import { z } from "zod";

const schema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be string"
  }),
  password: z.string({}).min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => {
  return data.password === data.confirmPassword
}, {
  message: "Passwords do not match"
})

function createUser(props) {
  // const result = schema.parse(props);
  const result = schema.parse(props);
  return result;
}

type CreateUserInput = z.infer<typeof schema>

const payload: CreateUserInput = {
  name: "John",
  password: "123456",
  confirmPassword: "1234568"
}


const result = createUser(payload);
console.log(JSON.stringify(result, null, 2))
