"use client"
import { FieldValues, useForm } from "react-hook-form";
import z, { setErrorMap } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signupSchema } from "@/lib/types";

const FormWithReactHookFormAndZod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignUpSchema) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const resData = await res.json();

    if (!res.ok) {
      alert("Submitting form failed");
      return;
    }

    if (resData.errors) {
      const errors = resData.errors;

      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email
        })
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password
        })
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword
        })
      } else {
        alert("Something went wrong!")
      }
    }

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 text-black">
      <input {...register("email")} type="email" placeholder="Email" className="px-4 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input {...register("password")} type="password"
        placeholder="Password"
        className="px-4 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
        className="px-4 py-2 rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
      )}

      <button className="bg-blue-500 disabled:bg-gray-500 py-2 rounded">Submit</button>
    </form>
  );
};

export default FormWithReactHookFormAndZod;
