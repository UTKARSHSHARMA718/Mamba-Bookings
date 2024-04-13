import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request?.cookies?.get("next-auth.session-token")?.value;

  if (!cookie) {
    const newUrl = new URL("/", request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse?.next();
}

// NOTE: This faulty technology is not able to detect value of constant variables hence I have provided string sdirectly
export const config = {
  matcher: ["/properties", "/trips", "/reservations", "/favourite"],
};
