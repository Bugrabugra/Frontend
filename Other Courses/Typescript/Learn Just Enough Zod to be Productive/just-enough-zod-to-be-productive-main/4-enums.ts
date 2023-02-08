import {z} from "zod";

const userTypes = z.enum(["admin", "user", "guest"]);

type UserTypes = z.infer<typeof userTypes>

enum UserTypeNative {
  admin,
  user,
  guest
}

const userSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(UserTypeNative)
})

type User = z.infer<typeof userSchema>


const user: User = {
  name: "John",
  type: UserTypeNative.user
}

console.log(userSchema.parse(user))
