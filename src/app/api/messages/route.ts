import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user || !user.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const { swapRequestId, content } = await request.json()

        // Validate input
        if (!swapRequestId) {
            return NextResponse.json({ success: false, error: "Swap request ID is required" }, { status: 400 })
        }

        if (!content || !content.trim()) {
            return NextResponse.json({ success: false, error: "Message content cannot be empty" }, { status: 400 })
        }

        // Check if swap request exists
        const swapRequest = await prisma.swapRequest.findUnique({
            where: { id: swapRequestId },
        })

        if (!swapRequest) {
            return NextResponse.json({ success: false, error: "Swap request not found" }, { status: 404 })
        }

        // Check if user is part of this swap request
        if (swapRequest.requesterId !== user.id && swapRequest.receiverId !== user.id) {
            return NextResponse.json(
                { success: false, error: "You are not authorized to send messages in this swap request" },
                { status: 403 },
            )
        }

        // Create the message
        const message = await prisma.message.create({
            data: {
                content: content.trim(),
                swapRequestId,
                senderId: user.id,
            },
        })

        return NextResponse.json({ success: true, message })
    } catch (error) {
        console.error("Error sending message:", error)
        return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
    }
}

