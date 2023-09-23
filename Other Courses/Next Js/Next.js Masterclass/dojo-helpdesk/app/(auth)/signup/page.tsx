"use client";

import React, { FormEvent, useState } from "react";
import AuthForm from "@/app/(auth)/AuthForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/verify");
    }

  };

  return (
    <main>
      <h2 className="text-center">Sign up</h2>

      <AuthForm handleSubmit={handleSubmit} />
      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  );
};

export default Signup;
