import { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn.ts";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }

const Button = ({ className, variant, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)} />

  );
};

const buttonVariants = cva("py-2 px-4 rounded-md font-semibold hover:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-indigo-300 to-indigo-700 text-black",
        secondary: "bg-grayscale-700 text-white"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  })

export default Button;
