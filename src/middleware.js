import * as jose from 'jose';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = cookies(req).get("token")?.value;
  let userId = null;  

  if (!token && pathname !== "/auth/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (token) {
    try {
      const decodedToken = jose.decodeJwt(token);
      userId = decodedToken?.iss;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  if (pathname.includes("/auth/login") || userId) {
    return NextResponse.next();
  }
}

// Specify which routes the middleware should apply to
export const config = {
  matcher: ["/", "/admin", "/customer", "/setting"],
};
