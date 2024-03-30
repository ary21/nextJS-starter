// import jwt from "jsonwebtoken";
import * as jose from 'jose';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const token = cookies(req).get("token")?.value;
  let userId = null;

  console.log("cookies >", req.cookies);
  console.log("token >", token);
  if (token) {
    try {
      const decodedToken = jose.jwtVerify(token, 'OKE123***');
      userId = decodedToken?.issuer;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  const { pathname } = req.nextUrl;
  console.log("pathname >", pathname);

  if (pathname.includes("/auth/login") || userId) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/auth/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
}

// Specify which routes the middleware should apply to
export const config = {
  matcher: ["/", "/admin", "/customer", "/setting"],
};

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }
