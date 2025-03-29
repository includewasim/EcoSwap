import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next()
  },
  {
    // Routes that require authentication
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    publicRoutes: ["/", "/api/auth(.*)"],
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/items/:path*", "/swaps/:path*", "/profile/:path*"],
}

