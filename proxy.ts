import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect app routes, leave auth/login/signup/register open
    "/((?!login|logout|register|signup|api/auth|api/register|_next/static|_next/image|favicon\\.ico).*)",
  ],
};
