import { getUser } from "@/lib/kinde"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { getSwapRequests } from "@/lib/swaps"
import { SwapRequestCard } from "@/components/swaps/swap-request-card"
import Link from "next/link"

export default async function Swaps() {
  const user = await getUser()

  if (!user) {
    redirect("/api/auth/login")
  }

  const { sent, received } = await getSwapRequests(user.id)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">My Swaps</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Received Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Requests Received</h2>
            {received.length > 0 ? (
              <div className="space-y-4">
                {received.map((request) => (
                  <SwapRequestCard key={request.id} request={request} type="received" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-gray-500 mb-4">You haven't received any swap requests yet.</p>
                <p className="text-sm text-gray-400">
                  When someone requests to swap one of your items, it will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Sent Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Requests Sent</h2>
            {sent.length > 0 ? (
              <div className="space-y-4">
                {sent.map((request) => (
                  <SwapRequestCard key={request.id} request={request} type="sent" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-gray-500 mb-4">You haven't sent any swap requests yet.</p>
                <Link href="/items" className="text-eco-green hover:underline">
                  Browse items to find something to swap
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

