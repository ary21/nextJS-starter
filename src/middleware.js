import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function middleware(req) {
//  const token = req.cookies?.token;
const token = cookies(req).get('token')?.value;

 let userId = null;
 console.log('token >', req.cookies, token)
 if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);
      userId = decodedToken?.issuer;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
 }

 const { pathname } = req.nextUrl;
 console.log('pathname >', pathname)

 if (pathname.includes("/auth/login") || userId) {
    return NextResponse.next();
 }

 if (!token && pathname !== "/auth/login") {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url);
 }
}

// Specify which routes the middleware should apply to
export const config = {
  matcher: ['/', '/admin', '/customer', '/setting'],
 };
 
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }