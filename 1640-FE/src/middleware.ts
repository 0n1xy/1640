import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const isLoggedIn : boolean = false

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    let access_token = cookies().get("access_token")
    let role = cookies().get("role")
    if(typeof(access_token) == null) {
        return NextResponse.next()
    }

    // const managerPath = path === "/manager"
    
    // if(managerPath && role?.value != 'Manager') {
    //     return NextResponse.redirect(new URL('/home', request.nextUrl))
    // }
    
}
