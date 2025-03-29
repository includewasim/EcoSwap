import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user || !user.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        // Get user's available items
        const items = await prisma.item.findMany({
            where: {
                userId: user.id,
                isAvailable: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json({ success: true, items })
    } catch (error) {
        console.error("Error fetching user items:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 })
    }
}

