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

        const { itemId, receiverId, message, offeredItemId } = await request.json()

        // Validate input
        if (!itemId) {
            return NextResponse.json({ success: false, error: "Item ID is required" }, { status: 400 })
        }

        if (!receiverId) {
            return NextResponse.json({ success: false, error: "Receiver ID is required" }, { status: 400 })
        }

        // Check if the item exists
        const item = await prisma.item.findUnique({
            where: { id: itemId },
        })

        if (!item) {
            return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
        }

        // Check if the offered item exists and belongs to the requester
        if (offeredItemId) {
            const offeredItem = await prisma.item.findUnique({
                where: {
                    id: offeredItemId,
                    userId: user.id,
                },
            })

            if (!offeredItem) {
                return NextResponse.json(
                    { success: false, error: "Offered item not found or doesn't belong to you" },
                    { status: 404 },
                )
            }
        }

        // Create the swap request
        const swapRequest = await prisma.swapRequest.create({
            data: {
                requesterId: user.id,
                receiverId,
                itemId,
                offeredItemId,
                status: "pending",
            },
        })

        // Create the initial message
        if (message && message.trim()) {
            await prisma.message.create({
                data: {
                    content: message.trim(),
                    swapRequestId: swapRequest.id,
                    senderId: user.id,
                },
            })
        }

        return NextResponse.json({ success: true, swapRequest })
    } catch (error) {
        console.error("Error creating swap request:", error)
        return NextResponse.json({ success: false, error: "Failed to create swap request" }, { status: 500 })
    }
}

