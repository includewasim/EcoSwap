import prisma from "./prisma"

export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    category: "swap" | "impact" | "community" | "special"
    level: "bronze" | "silver" | "gold" | "platinum"
    requirement: number
    backgroundColor: string
}

// Define all available badges
export const AVAILABLE_BADGES: Badge[] = [
    // Swap badges
    {
        id: "first-swap",
        name: "First Swap",
        description: "Completed your first swap",
        icon: "🔄",
        category: "swap",
        level: "bronze",
        requirement: 1,
        backgroundColor: "#f59e0b20",
    },
    {
        id: "swap-enthusiast",
        name: "Swap Enthusiast",
        description: "Completed 5 swaps",
        icon: "🔄",
        category: "swap",
        level: "silver",
        requirement: 5,
        backgroundColor: "#a3a3a320",
    },
    {
        id: "swap-master",
        name: "Swap Master",
        description: "Completed 10 swaps",
        icon: "🔄",
        category: "swap",
        level: "gold",
        requirement: 10,
        backgroundColor: "#f59e0b20",
    },
    {
        id: "swap-legend",
        name: "Swap Legend",
        description: "Completed 25 swaps",
        icon: "🔄",
        category: "swap",
        level: "platinum",
        requirement: 25,
        backgroundColor: "#a3e63520",
    },

    // Impact badges
    {
        id: "carbon-saver",
        name: "Carbon Saver",
        description: "Saved 10kg of CO₂",
        icon: "🌍",
        category: "impact",
        level: "bronze",
        requirement: 10,
        backgroundColor: "#4ade8020",
    },
    {
        id: "eco-warrior",
        name: "Eco Warrior",
        description: "Saved 50kg of CO₂",
        icon: "🌍",
        category: "impact",
        level: "silver",
        requirement: 50,
        backgroundColor: "#4ade8020",
    },
    {
        id: "climate-champion",
        name: "Climate Champion",
        description: "Saved 100kg of CO₂",
        icon: "🌍",
        category: "impact",
        level: "gold",
        requirement: 100,
        backgroundColor: "#4ade8020",
    },

    // Community badges
    {
        id: "community-member",
        name: "Community Member",
        description: "Listed your first item",
        icon: "📦",
        category: "community",
        level: "bronze",
        requirement: 1,
        backgroundColor: "#60a5fa20",
    },
    {
        id: "community-contributor",
        name: "Community Contributor",
        description: "Listed 5 items",
        icon: "📦",
        category: "community",
        level: "silver",
        requirement: 5,
        backgroundColor: "#60a5fa20",
    },
    {
        id: "community-pillar",
        name: "Community Pillar",
        description: "Listed 10 items",
        icon: "📦",
        category: "community",
        level: "gold",
        requirement: 10,
        backgroundColor: "#60a5fa20",
    },

    // Special badges
    {
        id: "early-adopter",
        name: "Early Adopter",
        description: "Joined during our beta phase",
        icon: "🚀",
        category: "special",
        level: "gold",
        requirement: 0,
        backgroundColor: "#8b5cf620",
    },
    {
        id: "eco-innovator",
        name: "Eco Innovator",
        description: "Provided feedback to improve the platform",
        icon: "💡",
        category: "special",
        level: "silver",
        requirement: 0,
        backgroundColor: "#8b5cf620",
    },
]

// Get all badges for a user
export async function getUserBadges(userId: string) {
    try {
        // In a real app, you would fetch the user's badges from the database
        // For this demo, we'll simulate it based on their stats

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                swapRequests: {
                    where: { status: "completed" },
                },
                items: true,
            },
        })

        if (!user) {
            return []
        }

        // Calculate user stats
        const swapsCompleted = user.swapRequests.length
        const itemsListed = user.items.length
        const co2Saved = swapsCompleted * 5.2 // Assuming 5.2kg CO2 saved per swap

        // Determine which badges the user has earned
        const earnedBadges = AVAILABLE_BADGES.filter((badge) => {
            switch (badge.id) {
                // Swap badges
                case "first-swap":
                case "swap-enthusiast":
                case "swap-master":
                case "swap-legend":
                    return swapsCompleted >= badge.requirement

                // Impact badges
                case "carbon-saver":
                case "eco-warrior":
                case "climate-champion":
                    return co2Saved >= badge.requirement

                // Community badges
                case "community-member":
                case "community-contributor":
                case "community-pillar":
                    return itemsListed >= badge.requirement

                // Special badges - for demo purposes, we'll give these to everyone
                case "early-adopter":
                case "eco-innovator":
                    return true

                default:
                    return false
            }
        })

        return earnedBadges
    } catch (error) {
        console.error("Error fetching user badges:", error)
        return []
    }
}

// Get all available badges
export function getAllBadges() {
    return AVAILABLE_BADGES
}

