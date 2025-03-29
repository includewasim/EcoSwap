import prisma from "./prisma"

interface GetItemsOptions {
  category?: string
  query?: string
  userId?: string
  limit?: number
}

export async function getItems(options: GetItemsOptions = {}) {
  const { category, query, userId, limit = 100 } = options

  const where: any = {}

  // Only filter by isAvailable if we're not looking for a specific user's items
  if (!userId) {
    where.isAvailable = true
  }

  if (category) {
    where.category = category
  }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { tags: { has: query } },
    ]
  }

  if (userId) {
    where.userId = userId
  }

  try {
    const items = await prisma.item.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: true,
      },
    })

    return items
  } catch (error) {
    console.error("Error fetching items:", error)
    return []
  }
}

export async function getItemById(id: string) {
  try {
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    return item
  } catch (error) {
    console.error("Error fetching item:", error)
    return null
  }
}

