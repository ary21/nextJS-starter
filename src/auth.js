import { z } from "zod";
import NextAuth from "next-auth";
// import bcrypt from 'bcrypt';
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./common/config/auth";
import * as UserService from "./common/service/UserService";

async function getUser({ email }) {
  try {
    return UserService.getOneUser({ email });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = true // await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
