
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const access_token = cookies().get("access_token");
    const role = cookies().get("role");

    // // Check if access_token is not present
    // if (access_token === null) {
    //     // Redirect to '/' only if not already on that path
    //     if (path !== "/") {
    //         return NextResponse.redirect(new URL('/', request.nextUrl));
    //     } else {
    //         return NextResponse.next(); // If already at '/', proceed
    //     }
    // }

    // // Role-based access control
    // if (path.startsWith("/manager") && role?.value !== 'Manager') {
    //     if(role?.value != null) {
    //         return NextResponse.redirect(new URL('/home', request.nextUrl));
    //     } else {
    //         return NextResponse.redirect(new URL('/', request.nextUrl));
    //     }
    // } else if (path.startsWith("/Register") && role?.value !== 'Admin') {
    //     if(role?.value != null) {
    //         return NextResponse.redirect(new URL('/home', request.nextUrl));
    //     } else {
    //         return NextResponse.redirect(new URL('/', request.nextUrl));
    //     }
    // } else if(path.startsWith("/student") && role?.value !== 'Student') {
    //     if(role?.value != null) {
    //         return NextResponse.redirect(new URL('/home', request.nextUrl));
    //     } else {
    //         return NextResponse.redirect(new URL('/', request.nextUrl));
    //     }
    // }

    // Proceed if access_token is present and role is allowed
    return NextResponse.next();
}