import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export const createUserSchema = object({
  name: string().nonempty({
    message: "Name is required"
  }),
  password: string({
    required_error: "Password is required",
  }).min(6, "Password too short - should be 6 chars minimum")
    .nonempty({
      message: "Password is required"
    }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required"
  }),
  email: string({
    required_error: "Email is required",
  }).email("Not a valid email")
    .nonempty({
      message: "Email is required"
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
  const [registerError, setRegisterError] = useState(null);
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema)
  });

  async function onSubmit(values: CreateUserInput) {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`, values);
      router.push("/");
    } catch (error: any) {
      setRegisterError(error.message);
    }
  }

  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="jane.doe@example.com" {...register("email")}/>
          <p>{errors.email?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Jane Doe" {...register("name")}/>
          <p>{errors.name?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="*********" {...register("password")}/>
          <p>{errors.password?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="*********" {...register("passwordConfirmation")}/>
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
        <button>SUBMIT</button>
      </form>
    </>
  )
}

export default RegisterPage;
