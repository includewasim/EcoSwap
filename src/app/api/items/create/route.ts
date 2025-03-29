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

        const { title, description, condition, category, tags, images, latitude, longitude } = await request.json()

        // Validate input
        if (!title || !title.trim()) {
            return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 })
        }

        if (!description || !description.trim()) {
            return NextResponse.json({ success: false, error: "Description is required" }, { status: 400 })
        }

        if (!condition) {
            return NextResponse.json({ success: false, error: "Condition is required" }, { status: 400 })
        }

        if (!category) {
            return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 })
        }

        // Create the item
        const item = await prisma.item.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                condition,
                category,
                tags: tags || [],
                images: images || [],
                userId: user.id,
                latitude: latitude || 0,
                longitude: longitude || 0,
            },
        })

        return NextResponse.json({ success: true, item })
    } catch (error) {
        console.error("Error creating item:", error)
        return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 })
    }
}

