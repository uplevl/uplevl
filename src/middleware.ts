import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isApiStudioRoute = createRouteMatcher(["/api/studio(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // If not logged in and trying to access API Studio route, return 401
  if (!userId && isApiStudioRoute(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If not logged in and trying to access protected route, redirect to sign in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Protect admin routes - only allow users with admin role
  if (userId && isAdminRoute(req)) {
    if (sessionClaims?.metadata?.role !== "admin" && sessionClaims?.metadata?.role !== "superadmin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return response;
  }

  // Handle onboarding access
  if (userId && isOnboardingRoute(req)) {
    if (!sessionClaims?.metadata?.onboardingComplete) {
      return response;
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect to onboarding if not completed
  if (userId && isProtectedRoute(req) && !sessionClaims?.metadata?.onboardingComplete) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Allow access to protected routes for logged-in users with completed onboarding
  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
