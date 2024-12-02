import NextAuth from "next-auth";
import Twitter from "@auth/core/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Twitter]
});
