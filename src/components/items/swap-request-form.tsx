"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ItemCard } from "./item-card"

interface SwapRequestFormProps {
  itemId: string
  receiverId: string
}

export function SwapRequestForm({ itemId, receiverId }: SwapRequestFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [userItems, setUserItems] = useState<any[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's items
  useEffect(() => {
    async function fetchUserItems() {
      try {
        const response = await fetch("/api/user/items")
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch items")
        }
        const data = await response.json()
        setUserItems(data.items)
      } catch (error) {
        console.error("Error fetching user items:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch items")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserItems()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/swaps/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          receiverId,
          message,
          offeredItemId: selectedItemId || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create swap request")
      }

      if (data.success) {
        router.push("/swaps")
        router.refresh()
      } else {
        throw new Error(data.error || "Unknown error")
      }
    } catch (error) {
      console.error("Error creating swap request:", error)
      setError(error instanceof Error ? error.message : "Failed to create swap request")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message to Owner
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
          placeholder="Introduce yourself and explain why you're interested in this item..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select an item to offer in exchange (optional)
        </label>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-eco-green border-r-transparent"></div>
            <p className="mt-2 text-sm text-gray-500">Loading your items...</p>
          </div>
        ) : userItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto p-2">
            {userItems.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer rounded-lg border-2 transition-all ${selectedItemId === item.id ? "border-eco-green shadow-md" : "border-transparent hover:border-gray-200"
                  }`}
                onClick={() => setSelectedItemId(item.id === selectedItemId ? null : item.id)}
              >
                <ItemCard item={item} />
                {selectedItemId === item.id && (
                  <div className="bg-eco-green text-white text-center py-2 rounded-b-lg">Selected for Swap</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">You don't have any items to offer.</p>
            <Button type="button" variant="outline" className="mt-2" onClick={() => router.push("/items/new")}>
              List an Item First
            </Button>
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="gradient"
        disabled={isSubmitting || !message.trim()}
        className="w-full shadow-lg shadow-eco-green/20"
      >
        {isSubmitting ? "Sending Request..." : selectedItemId ? "Request to Swap Items" : "Request to Swap"}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By requesting a swap, you'll be able to chat with the owner and arrange the exchange.
        {selectedItemId && " If accepted, you'll exchange your selected item with the owner's item."}
      </p>
    </form>
  )
}

