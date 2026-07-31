import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  console.log("🔒 PROXY", request.nextUrl.pathname);

  const sessionId = request.cookies.get("cardapio_sessionId")?.value;

  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel", "/painel/:path*", "/tv", "/tv/:path*"],
};
