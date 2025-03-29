import { getUser } from "@/lib/kinde"
import { redirect, notFound } from "next/navigation"
import { Header } from "@/components/header"
import { getSwapRequestById } from "@/lib/swaps"
import Link from "next/link"
import { MessageList } from "@/components/swaps/message-list"
import { MessageForm } from "@/components/swaps/message-form"
import { SwapActions } from "@/components/swaps/swap-actions"
import { CompletionButton } from "@/components/swaps/completion-button"

interface SwapRequestDetailProps {
  params: {
    id: string
  }
}

export default async function SwapRequestDetail({ params }: SwapRequestDetailProps) {
  const user = await getUser()

  if (!user) {
    redirect("/api/auth/login")
  }

  // Make sure params.id is a string before passing it to getSwapRequestById
  const id = params?.id || ""
  const swapRequest = await getSwapRequestById(id)

  if (!swapRequest) {
    notFound()
  }

  // Check if the user is part of this swap request
  const isRequester = user.id === swapRequest.requesterId
  const isReceiver = user.id === swapRequest.receiverId

  if (!isRequester && !isReceiver) {
    redirect("/swaps")
  }

  const otherUser = isRequester ? swapRequest.receiver : swapRequest.requester

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/swaps" className="text-eco-green hover:underline flex items-center gap-1">
              <span>←</span> Back to swaps
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Swap Request</h1>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${swapRequest.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : swapRequest.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : swapRequest.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {swapRequest.status.charAt(0).toUpperCase() + swapRequest.status.slice(1)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requested Item Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">{isRequester ? "Item You Want" : "Your Item"}</h2>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      {swapRequest.item.images && swapRequest.item.images.length > 0 ? (
                        <img
                          src={swapRequest.item.images[0] || "/placeholder.svg"}
                          alt={swapRequest.item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-2xl">📷</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{swapRequest.item.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">Condition: {swapRequest.item.condition}</p>
                      <Link href={`/items/${swapRequest.item.id}`} className="text-eco-green text-sm hover:underline">
                        View Item
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Offered Item Details (if any) */}
                {swapRequest.offeredItem ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">
                      {isRequester ? "Item You're Offering" : "Item Being Offered"}
                    </h2>
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        {swapRequest.offeredItem.images && swapRequest.offeredItem.images.length > 0 ? (
                          <img
                            src={swapRequest.offeredItem.images[0] || "/placeholder.svg"}
                            alt={swapRequest.offeredItem.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-2xl">📷</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{swapRequest.offeredItem.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">Condition: {swapRequest.offeredItem.condition}</p>
                        <Link
                          href={`/items/${swapRequest.offeredItem.id}`}
                          className="text-eco-green text-sm hover:underline"
                        >
                          View Item
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">
                      {isRequester ? "Other User Details" : "Requester Details"}
                    </h2>
                    <div className="flex gap-4">
                      {otherUser?.profileImage ? (
                        <img
                          src={otherUser.profileImage || "/placeholder.svg"}
                          alt={otherUser.firstName || "User"}
                          className="h-12 w-12 rounded-full"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-eco-green flex items-center justify-center text-white font-bold">
                          {otherUser?.firstName?.[0] || "U"}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">
                          {otherUser?.firstName} {otherUser?.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Member since {new Date(otherUser?.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Receiver */}
              {isReceiver && swapRequest.status === "pending" && <SwapActions swapRequestId={swapRequest.id} />}

              {/* Status Messages */}
              {swapRequest.status === "accepted" && (
                <div className="mt-6 pt-6 border-t border-gray-100 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 flex items-center gap-2">
                    <span className="text-xl">✓</span>
                    This swap request has been accepted! You can now arrange the exchange details through the chat.
                  </p>
                  {isReceiver && (
                    <div className="mt-4">
                      <CompletionButton swapRequestId={swapRequest.id} />
                    </div>
                  )}
                </div>
              )}

              {swapRequest.status === "rejected" && (
                <div className="mt-6 pt-6 border-t border-gray-100 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800 flex items-center gap-2">
                    <span className="text-xl">✗</span>
                    This swap request has been declined.
                  </p>
                </div>
              )}

              {swapRequest.status === "completed" && (
                <div className="mt-6 pt-6 border-t border-gray-100 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 flex items-center gap-2">
                    <span className="text-xl">🎉</span>
                    This swap has been completed successfully! Thank you for reducing waste.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">Messages</h2>
            </div>

            <MessageList messages={swapRequest.messages} currentUserId={user.id} />

            {(swapRequest.status === "pending" || swapRequest.status === "accepted") && (
              <div className="p-6 border-t border-gray-100">
                <MessageForm swapRequestId={swapRequest.id} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

