import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  //You can use the pages option to specify the route for custom sign-in, sign out, and error pages.
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true; //comment out to enable auth code below

      //The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
      //It is called before a request is completed, and it receives an object with the auth and request properties.
      //he auth property contains the user's session, and the request property contains the incoming request.
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
