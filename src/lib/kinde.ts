import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "./prisma"

export async function getUser() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) return null

    // Check if user exists in database
    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
    })

    // If user doesn't exist, create a new user
    if (!dbUser) {
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                firstName: user.given_name,
                lastName: user.family_name,
                profileImage: user.picture,
            },
        })
    }

    return user
}

