import prisma from "./prisma"
import { withRetry } from "./db-retry"

export async function getSwapRequests(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required")
    }

    // Get requests sent by the user
    const sent = await withRetry(() =>
      prisma.swapRequest.findMany({
        where: {
          requesterId: userId,
        },
        include: {
          item: true,
          offeredItem: true,
          receiver: true,
          messages: {
            orderBy: {
              createdAt: "asc",
            },
            take: 1,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    )

    // Get requests received by the user
    const received = await withRetry(() =>
      prisma.swapRequest.findMany({
        where: {
          receiverId: userId,
        },
        include: {
          item: true,
          offeredItem: true,
          requester: true,
          messages: {
            orderBy: {
              createdAt: "asc",
            },
            take: 1,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    )

    return { sent, received }
  } catch (error) {
    console.error("Error fetching swap requests:", error)
    return { sent: [], received: [] }
  }
}

export async function getSwapRequestById(id: string) {
  try {
    if (!id) {
      throw new Error("Swap request ID is required")
    }

    const swapRequest = await withRetry(() =>
      prisma.swapRequest.findUnique({
        where: { id },
        include: {
          item: true,
          offeredItem: true,
          requester: true,
          receiver: true,
          messages: {
            orderBy: {
              createdAt: "asc",
            },
            include: {
              swapRequest: true,
            },
          },
        },
      }),
    )

    return swapRequest
  } catch (error) {
    console.error("Error fetching swap request:", error)
    return null
  }
}

