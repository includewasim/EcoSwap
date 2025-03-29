"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface SwapActionsProps {
    swapRequestId: string
}

export function SwapActions({ swapRequestId }: SwapActionsProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleAction = async (status: "accepted" | "rejected" | "completed") => {
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch("/api/swaps/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: swapRequestId,
                    status,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || `Failed to ${status} swap request`)
            }

            if (data.success) {
                router.refresh()
            } else {
                throw new Error(data.error || "Unknown error")
            }
        } catch (error) {
            console.error("Error updating swap request:", error)
            setError(error instanceof Error ? error.message : "Failed to update swap request")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mt-6 pt-6 border-t border-gray-100">
            {error && <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>}

            <div className="flex gap-4">
                <Button
                    variant="gradient"
                    className="flex-1 shadow-lg shadow-eco-green/20"
                    onClick={() => handleAction("accepted")}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Processing..." : "Accept Request"}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleAction("rejected")} disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Decline Request"}
                </Button>
            </div>
        </div>
    )
}

