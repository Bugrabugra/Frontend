"use client";

import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton = ({ title, variant, className }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => router.back()}
      title={title}
    >
      {title}
    </Button>
  );
};

export default BackButton;
