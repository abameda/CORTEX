import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "US";
  const response = NextResponse.next();
  response.cookies.set("user-country", country, {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/"],
};
