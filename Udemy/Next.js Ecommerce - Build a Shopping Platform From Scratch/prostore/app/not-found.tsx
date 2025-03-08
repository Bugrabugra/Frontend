"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={48}
        height={48}
        priority
      />
      <div className="p-6 rounded-lg w-1/3 shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => redirect("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
