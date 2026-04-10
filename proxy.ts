import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const basicAuth = request.headers.get("authorization");
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    return new NextResponse("Missing admin credentials.", { status: 500 });
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const decoded = atob(authValue);
    const [user, pass] = decoded.split(":");

    if (user === adminUsername && pass === adminPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};