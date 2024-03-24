import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();

  console.log({ allCookies });

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  // matcher: [
  //   "/reservations",
  //   "/trips",
  //   "/favourites",
  //   "/listing/:path*",
  //   "/properties",
  // ],
};
