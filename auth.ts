import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";

//bcrypt relies on Node.js APIs not available in Next.js Middleware.
//To solve this, auth.ts is created and imports bcrypt.
//The new file will not be imported into your Middleware file.
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

//SeeL https://authjs.dev/guides/upgrade-to-v5
export const { auth, signIn, signOut } = NextAuth({
  //spread our authConfig object
  ...authConfig,
  //list of providers - https://authjs.dev/getting-started/providers
  providers: [
    Credentials({
      //Use the authorize function to handle the authentication logic.
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          //Then, call bcrypt.compare to check if the passwords match:
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
