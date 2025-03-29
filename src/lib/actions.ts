"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "./prisma"

interface MessageData {
  swapRequestId: string
  content: string
}

export async function sendMessage(data: MessageData) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      return {
        success: false,
        error: "You must be logged in to send messages",
      }
    }

    // Validate input
    if (!data.swapRequestId) {
      return {
        success: false,
        error: "Swap request ID is required",
      }
    }

    if (!data.content.trim()) {
      return {
        success: false,
        error: "Message content cannot be empty",
      }
    }

    // Check if swap request exists
    const swapRequest = await prisma.swapRequest.findUnique({
      where: { id: data.swapRequestId },
    })

    if (!swapRequest) {
      return {
        success: false,
        error: "Swap request not found",
      }
    }

    // Check if user is part of this swap request
    if (swapRequest.requesterId !== user.id && swapRequest.receiverId !== user.id) {
      return {
        success: false,
        error: "You are not authorized to send messages in this swap request",
      }
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        content: data.content.trim(),
        swapRequestId: data.swapRequestId,
        senderId: user.id,
      },
    })

    return { success: true, message }
  } catch (error) {
    console.error("Error sending message:", error)
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    }
  }
}

interface SwapRequestData {
  itemId: string
  receiverId: string
  message: string
  offeredItemId?: string
}

export async function createSwapRequest(data: SwapRequestData) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      return {
        success: false,
        error: "You must be logged in to create a swap request",
      }
    }

    // Validate input
    if (!data.itemId) {
      return {
        success: false,
        error: "Item ID is required",
      }
    }

    if (!data.receiverId) {
      return {
        success: false,
        error: "Receiver ID is required",
      }
    }

    // Check if the item exists
    const item = await prisma.item.findUnique({
      where: { id: data.itemId },
    })

    if (!item) {
      return {
        success: false,
        error: "Item not found",
      }
    }

    // Check if the offered item exists and belongs to the requester
    let offeredItem = null
    if (data.offeredItemId) {
      offeredItem = await prisma.item.findUnique({
        where: {
          id: data.offeredItemId,
          userId: user.id,
        },
      })

      if (!offeredItem) {
        return {
          success: false,
          error: "Offered item not found or doesn't belong to you",
        }
      }
    }

    // Create the swap request
    const swapRequest = await prisma.swapRequest.create({
      data: {
        requesterId: user.id,
        receiverId: data.receiverId,
        itemId: data.itemId,
        offeredItemId: data.offeredItemId,
        status: "pending",
      },
    })

    // Create the initial message
    if (data.message.trim()) {
      await prisma.message.create({
        data: {
          content: data.message.trim(),
          swapRequestId: swapRequest.id,
          senderId: user.id,
        },
      })
    }

    return { success: true, swapRequest }
  } catch (error) {
    console.error("Error creating swap request:", error)
    return {
      success: false,
      error: "Failed to create swap request. Please try again.",
    }
  }
}

export async function updateSwapRequestStatus(id: string, status: "accepted" | "rejected" | "completed") {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      return {
        success: false,
        error: "You must be logged in to update a swap request",
      }
    }

    // Check if the swap request exists
    const swapRequest = await prisma.swapRequest.findUnique({
      where: { id },
    })

    if (!swapRequest) {
      return {
        success: false,
        error: "Swap request not found",
      }
    }

    // Check if the user is the receiver of the swap request
    if (swapRequest.receiverId !== user.id) {
      return {
        success: false,
        error: "You are not authorized to update this swap request",
      }
    }

    // Update the swap request status
    const updatedSwapRequest = await prisma.swapRequest.update({
      where: { id },
      data: { status },
    })

    // If the swap is completed, update the items' availability
    if (status === "completed") {
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
    }

    return { success: true, swapRequest: updatedSwapRequest }
  } catch (error) {
    console.error("Error updating swap request:", error)
    return {
      success: false,
      error: "Failed to update swap request. Please try again.",
    }
  }
}

interface ItemData {
  title: string
  description: string
  condition: string
  category: string
  tags: string[]
  images: string[]
  userId: string
  latitude?: number
  longitude?: number
}

export async function createItem(data: ItemData) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      return {
        success: false,
        error: "You must be logged in to create an item",
      }
    }

    // Validate input
    if (!data.title.trim()) {
      return {
        success: false,
        error: "Title is required",
      }
    }

    if (!data.description.trim()) {
      return {
        success: false,
        error: "Description is required",
      }
    }

    if (!data.condition) {
      return {
        success: false,
        error: "Condition is required",
      }
    }

    if (!data.category) {
      return {
        success: false,
        error: "Category is required",
      }
    }

    // Create the item
    const item = await prisma.item.create({
      data: {
        title: data.title.trim(),
        description: data.description.trim(),
        condition: data.condition,
        category: data.category,
        tags: data.tags || [],
        images: data.images || [],
        userId: user.id,
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
      },
    })

    return { success: true, item }
  } catch (error) {
    console.error("Error creating item:", error)
    return {
      success: false,
      error: "Failed to create item. Please try again.",
    }
  }
}

