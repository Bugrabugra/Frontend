import './App.css';
import { number, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


function App() {
  const schema = z.object({
    firstName: string().min(2).max(30),
    lastName: string().min(2).max(30),
    email: z.string().email(),
    age: number().min(18).max(70),
    password: string().min(5).max(20),
    confirmPassword: string().min(5).max(20)
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const submitData = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First Name:</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label>Last Name:</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <span>{errors.age.message}</span>}

        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

        <input type="submit" />
      </form>
    </div>
  )
}

export default App
