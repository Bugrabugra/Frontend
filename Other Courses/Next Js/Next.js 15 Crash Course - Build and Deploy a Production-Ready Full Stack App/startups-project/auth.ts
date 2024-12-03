import NextAuth from "next-auth";
import Twitter from "@auth/core/providers/twitter";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_TWITTER_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Twitter],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_TWITTER_ID_QUERY, {
            id: user.id
          });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: user.id,
            name: user.name,
            username: profile.preferred_username,
            email: user.email,
            image: user.image,
            bio: ""
          });

          token.id = user.id;
        } else {
          token.id = existingUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    }
  }
});
