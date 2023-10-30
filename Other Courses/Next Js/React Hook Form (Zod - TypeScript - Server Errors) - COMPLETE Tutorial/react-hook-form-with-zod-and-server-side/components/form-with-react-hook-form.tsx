"use client"
import { FieldValues, useForm } from "react-hook-form";

const FormWithReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 text-black">
      <input {...register("email", {
        required: "Email is required"
      })} type="email" placeholder="Email" className="px-4 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input {...register("password", {
        required: "Password is required",
        minLength: {
          value: 5, message: "Must be longed than 5"
        }
      })} type="password"
        placeholder="Password"
        className="px-4 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <input
        {...register("confirmPassword", {
          required: "Confirm password is required",
          minLength: {
            value: 5, message: "Must be longed than 5"
          },
          validate: (value) => {
            return value === getValues("password") || "Passwords must match"
          }
        })}
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

export default FormWithReactHookForm;
