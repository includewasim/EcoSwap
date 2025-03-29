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

        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ success: false, error: "Swap request ID is required" }, { status: 400 })
        }

        // Check if the swap request exists
        const swapRequest = await prisma.swapRequest.findUnique({
            where: { id },
        })

        if (!swapRequest) {
            return NextResponse.json({ success: false, error: "Swap request not found" }, { status: 404 })
        }

        // Check if the user is the receiver of the swap request
        if (swapRequest.receiverId !== user.id) {
            return NextResponse.json(
                { success: false, error: "You are not authorized to complete this swap request" },
                { status: 403 },
            )
        }

        // Check if the swap request is in the accepted status
        if (swapRequest.status !== "accepted") {
            return NextResponse.json(
                { success: false, error: "Only accepted swap requests can be completed" },
                { status: 400 },
            )
        }

        // Update the swap request status to completed
        const updatedSwapRequest = await prisma.swapRequest.update({
            where: { id },
            data: { status: "completed" },
        })

        // Update the requested item's availability
        await prisma.item.update({
            where: { id: swapRequest.itemId },
            data: { isAvailable: false },
        })

        // If there's an offered item, update its availability too
        if (swapRequest.offeredItemId) {
            await prisma.item.update({
                where: { id: swapRequest.offeredItemId },
                data: { isAvailable: false },
            })
        }

        // Award impact points to both users
        await prisma.user.update({
            where: { id: swapRequest.requesterId },
            data: { impactPoints: { increment: 10 } },
        })

        await prisma.user.update({
            where: { id: swapRequest.receiverId },
            data: { impactPoints: { increment: 10 } },
        })

        return NextResponse.json({ success: true, swapRequest: updatedSwapRequest })
    } catch (error) {
        console.error("Error completing swap request:", error)
        return NextResponse.json({ success: false, error: "Failed to complete swap request" }, { status: 500 })
    }
}

