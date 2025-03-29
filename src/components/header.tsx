import Link from "next/link"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export async function Header() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <header
      className="py-4 border-b border-gray-100 bg-white sticky top-0 z-50"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 bg-eco-green rounded-full flex items-center justify-center">
            <Image src={'/ecoswap-logo.jpeg'} alt="Logo" width={250} height={250} className="rounded-full" />
            <div
              className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full"
              style={{ animation: "pulse 2s infinite" }}
            ></div>
          </div>
          <span className="text-xl font-bold gradient-text">EcoSwap</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/items" className="text-sm font-medium hover:text-eco-green transition-colors relative group">
            Browse Items
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eco-green transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium hover:text-eco-green transition-colors relative group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eco-green transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/impact" className="text-sm font-medium hover:text-eco-green transition-colors relative group">
            Impact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eco-green transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="font-medium">
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-3 border border-gray-200 rounded-full pl-2 pr-1 py-1">
                {user.picture ? (
                  <img
                    src={user.picture || "/placeholder.svg"}
                    alt={user.given_name || "User"}
                    className="h-8 w-8 rounded-full border-2 border-eco-green"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-eco-green flex items-center justify-center text-white font-bold">
                    {user.given_name?.[0] || "U"}
                  </div>
                )}
                <LogoutLink className="text-sm font-medium hover:text-eco-green transition-colors">
                  <Button variant="ghost" size="sm">
                    Sign Out
                  </Button>
                </LogoutLink>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <LoginLink>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button
                  variant="gradient"
                  size="sm"
                  className="shadow-lg"
                  style={{ boxShadow: "0 4px 14px 0 rgba(74, 222, 128, 0.2)" }}
                >
                  Join Now
                </Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

