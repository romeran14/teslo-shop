import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '@/utils';


export async function middleware( req: NextRequest, ev: NextFetchEvent ) {

    if (req.nextUrl.pathname.startsWith('/checkout')) {
       // console.log(req)
        
       const token = req.cookies.get('token')?.value
        if (token) {
            try {
               const resp = await jwt.isValidToken( token );
                console.log('ES VALIDO',resp)
                return NextResponse.next();
        
            } catch (error) {
                
                // return Response.redirect('/auth/login');
             
                const requestedPage = req.nextUrl.pathname;
                const redirectUrl = new URL(`/auth/login?p=${requestedPage}`, process.env.NODE_ENV === "development" ? process.env.DEV_DOMAIN : process.env.PRODUCTION_DOMAIN);
                console.log(redirectUrl.href, error)
                return NextResponse.redirect(redirectUrl.href);
    
    
            }
        }else{
            const requestedPage = req.nextUrl.pathname;
            const redirectUrl = new URL(`/auth/login?p=${requestedPage}`, process.env.NODE_ENV === "development" ? process.env.DEV_DOMAIN : process.env.PRODUCTION_DOMAIN);
            console.log("AQUI",redirectUrl.href,req.cookies.get('token')?.value)
            return NextResponse.redirect(redirectUrl.href);
        }

      }
   


}

