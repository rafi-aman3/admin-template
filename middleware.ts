import {
  clerkMiddleware as authMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// Define authentication-related pages
const authPages = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verification",
];

export default authMiddleware(async (auth, req) => {
  const { userId } = await auth();
  console.log(userId, "USERID in middleware");

  // Get the pathname from the URL
  const { pathname } = req.url ? new URL(req.url) : { pathname: "" };
  console.log(`Current pathname: ${pathname}`);

  // If the user is logged in and trying to access an auth page, redirect to dashboard
  if (userId && authPages.some((page) => pathname.startsWith(page))) {
    console.log(
      `User ${userId} is logged in and trying to access ${pathname}, redirecting to /dashboard`
    );
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is not logged in and trying to access a protected route, redirect to login
  if (!userId && isProtectedRoute(req)) {
    console.log(
      `User is not logged in and trying to access protected route ${pathname}, redirecting to /login`
    );
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log(`Request proceeding normally for ${pathname}`);
  // Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
