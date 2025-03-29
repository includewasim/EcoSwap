"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface CompletionButtonProps {
    swapRequestId: string
}

export function CompletionButton({ swapRequestId }: CompletionButtonProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleCompletion = async () => {
        if (!confirm("Are you sure you want to mark this swap as completed? This action cannot be undone.")) {
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch("/api/swaps/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: swapRequestId,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to complete swap")
            }

            if (data.success) {
                router.refresh()
            } else {
                throw new Error(data.error || "Unknown error")
            }
        } catch (error) {
            console.error("Error completing swap request:", error)
            setError(error instanceof Error ? error.message : "Failed to complete swap request")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            {error && <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>}

            <Button
                variant="gradient"
                className="w-full shadow-lg shadow-eco-green/20"
                onClick={handleCompletion}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Processing..." : "Mark Swap as Completed"}
            </Button>
        </div>
    )
}

