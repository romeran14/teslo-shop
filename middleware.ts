import { NextResponse, type NextRequest } from "next/server";
 import {getToken} from 'next-auth/jwt'
import { jwtVerify } from "jose";
 
export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  if (previousPage.startsWith("/checkout")) {


    const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
 //   console.log(session)

    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname='auth/login'
      url.search = `p=${ previousPage}`
      
      return NextResponse.redirect(url);
    }

    return NextResponse.next()
  /*  console.log('MIDDLEWARW')
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED)
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }*/


  }
}
 
export const config = {
  matcher: ["/checkout/:path*"],
};