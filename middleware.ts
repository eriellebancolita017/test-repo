/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export function middleware(request: any) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const userRole = request.cookies.get("userRole");
  const routeName = request.nextUrl.pathname;
  const authRoutes = [
    "/login",
    "/login2",
    "/seller/login",
    "/seller/login2",
    // "/seller/register",
    "/register",
    "/register2",
    "/verification-code",
    "/reset-password",
    "/verify-email",
  ];
  const publicRoutes = [
    "/term-&-conditions",
    "/privacy-policy",
    "/about-us",
    "/contact-us",
    "/faq",
    "/faq/buying-policies",
    "/",
  ];
  const bothRoutes = [
    "/search-result",
    "/search-detail",
    "/",
    "/home",
    "/sell",
    "/shopping-cart",
    "/store-page",
    "/buyer-page",
    "/seller/register",
    "/seller/register2",
  ];

  const isPublicRoute = Boolean(
    publicRoutes.find((item) => {
      return item === routeName;
    }),
  );
  const isBothRoute = Boolean(
    bothRoutes.find((item) => {
      return item === routeName;
    }),
  );

  const isAuthRoute = Boolean(
    authRoutes.find((item) => {
      return item === routeName;
    }),
  );

  if (isAuthRoute && accessToken && refreshToken) {
    if (userRole === "customer") {
      return NextResponse.redirect(new URL("/whats-new", request.url));
    } else {
      return NextResponse.redirect(new URL("/seller/dashboard", request.url));
    }
  } else if (isAuthRoute && !accessToken && !refreshToken) {
    return NextResponse.next();
  } else if (
    !isAuthRoute &&
    !isBothRoute &&
    !isPublicRoute &&
    !accessToken &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  } else if (
    !isAuthRoute &&
    !isBothRoute &&
    !isPublicRoute &&
    accessToken &&
    refreshToken
  ) {
    return NextResponse.next();
  } else if (isBothRoute || isPublicRoute) {
    return NextResponse.next();
  }

  // if (!isPublicRoute && !accessToken && !refreshToken) {
  //   if (request.nextUrl.pathname === "/home") {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // if (isPublicRoute && accessToken && refreshToken && !isBothRoute) {
  //   if (request.nextUrl.pathname === "/home") {
  //     return NextResponse.next();
  //   }
  //   if (userRole === "customer") {
  //     return NextResponse.redirect(new URL("/whats-new", request.url));
  //   } else {
  //     return NextResponse.redirect(new URL("/seller/dashboard", request.url));
  //   }
  // }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!assets|_next/static|_next/image|favicon.ico|manifest.json|icon-[0-9]+x[0-9]+.png|favicon.svg|firebase-messaging-sw.js|videos).*)",
  ],
};
