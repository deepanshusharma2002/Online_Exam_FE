import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("job_portal")?.value;
  const token_student = req.cookies.get("job_portal_agent")?.value;


  const protectedRoutes = ["/admin/dashboard"];

  const currentPath = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (currentPath.startsWith("/student/dashboard")) {
    if (!token_student) {
      return NextResponse.redirect(
        new URL("/student/login", req.url)
      );
    }
  }

  if (
    token_student &&
    (currentPath.startsWith("/student/login") ||
      currentPath.startsWith("/student/signup") || currentPath.startsWith("/student/verify-otp"))
  ) {
    return NextResponse.redirect(
      new URL("/student/dashboard", req.url)
    );
  }

  if (isProtected && !token) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && currentPath === "/admin/login") {
    const dashboardUrl = new URL("/admin/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path"
  ],
};
