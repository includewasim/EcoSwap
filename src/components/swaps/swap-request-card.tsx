import Link from "next/link"
import type { SwapRequest, Item, User, Message } from "@prisma/client"
import { Button } from "@/components/ui/button"

interface SwapRequestCardProps {
  request: SwapRequest & {
    item: Item
    offeredItem?: Item | null
    requester?: User
    receiver?: User
    messages: Message[]
  }
  type: "sent" | "received"
}

export function SwapRequestCard({ request, type }: SwapRequestCardProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  }

  const statusColor = statusColors[request.status as keyof typeof statusColors]

  return (
    <Link href={`/swaps/${request.id}`}>
      <div className="card-hover bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
        <div className="p-4">
          <div className="flex items-start gap-4">
            {/* Item Images */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Requested Item */}
                <div className="w-20 h-20 rounded-md overflow-hidden">
                  {request.item.images && request.item.images.length > 0 ? (
                    <img
                      src={request.item.images[0] || "/placeholder.svg"}
                      alt={request.item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">📷</span>
                    </div>
                  )}
                </div>

                {/* Offered Item (if any) */}
                {request.offeredItem && (
                  <>
                    <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-md overflow-hidden border-2 border-white">
                      {request.offeredItem.images && request.offeredItem.images.length > 0 ? (
                        <img
                          src={request.offeredItem.images[0] || "/placeholder.svg"}
                          alt={request.offeredItem.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xl">📷</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-eco-green rounded-full border border-white"></div>
                  </>
                )}
              </div>
            </div>

            {/* Request Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-lg truncate">{request.item.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                {type === "sent" ? (
                  <>
                    Requested from {request.receiver?.firstName} {request.receiver?.lastName}
                  </>
                ) : (
                  <>
                    Requested by {request.requester?.firstName} {request.requester?.lastName}
                  </>
                )}
              </p>

              {request.offeredItem && (
                <p className="text-sm text-eco-forest mb-2">
                  {type === "sent" ? "You offered:" : "They offered:"} {request.offeredItem.title}
                </p>
              )}

              {request.messages && request.messages.length > 0 && (
                <p className="text-sm text-gray-700 line-clamp-2">"{request.messages[0].content}"</p>
              )}

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</span>

                <Button variant="outline" size="sm" className="text-xs">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

