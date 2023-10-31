import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * Here you're initializing NextAuth.js with the authConfig object and exporting the auth property.
 * You're also using the matcher option from Middleware to specify that it should run on specific paths.
 *
 * The advantage of employing Middleware for this task is that the protected routes will not even start
 * rendering until the Middleware verifies the authentication, enhancing both the security and performance of your application.
 */

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - .png (png image files)
   */
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
