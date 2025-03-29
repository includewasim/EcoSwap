"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MessageFormProps {
  swapRequestId: string
}

export function MessageForm({ swapRequestId }: MessageFormProps) {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!message.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          swapRequestId,
          content: message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      if (data.success) {
        setMessage("")
        // Force a refresh to show the new message
        router.refresh()
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {error && <div className="p-2 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
          disabled={isSubmitting}
        />
        <Button type="submit" variant="gradient" disabled={isSubmitting || !message.trim()}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        Be respectful and clear in your communication. Messages cannot be deleted.
      </p>
    </form>
  )
}

