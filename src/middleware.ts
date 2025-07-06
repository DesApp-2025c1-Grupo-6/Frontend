import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/tarifa", request.url));
  }

  if (pathname === "/historial/detalles") {
    return NextResponse.redirect(new URL("/historial", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
