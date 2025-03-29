"use client"

import { useEffect, useState } from "react"
import { type Badge, AVAILABLE_BADGES, getUserBadges } from "@/lib/badges"

export function BadgeShowcase({ userId }: { userId: string }) {
    const [earnedBadges, setEarnedBadges] = useState<Badge[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

    useEffect(() => {
        async function fetchBadges() {
            try {
                // In a real app, you would fetch this from an API endpoint
                // For this demo, we'll call the function directly
                const badges = await getUserBadges(userId)
                setEarnedBadges(badges)
            } catch (error) {
                console.error("Error fetching badges:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchBadges()
    }, [userId])

    const allBadges = AVAILABLE_BADGES
    const lockedBadges = allBadges.filter((badge) => !earnedBadges.some((earned) => earned.id === badge.id))

    const getBadgeBorderColor = (level: string) => {
        switch (level) {
            case "bronze":
                return "border-amber-500"
            case "silver":
                return "border-gray-400"
            case "gold":
                return "border-yellow-500"
            case "platinum":
                return "border-cyan-300"
            default:
                return "border-gray-300"
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-eco-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div>
            {selectedBadge ? (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div
                            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl border-4 ${getBadgeBorderColor(
                                selectedBadge.level,
                            )}`}
                            style={{ backgroundColor: selectedBadge.backgroundColor }}
                        >
                            {selectedBadge.icon}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2">{selectedBadge.name}</h3>
                            <p className="text-gray-500 mb-4">{selectedBadge.description}</p>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${selectedBadge.level === "bronze"
                                        ? "bg-amber-100 text-amber-800"
                                        : selectedBadge.level === "silver"
                                            ? "bg-gray-200 text-gray-800"
                                            : selectedBadge.level === "gold"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-cyan-100 text-cyan-800"
                                        }`}
                                >
                                    {selectedBadge.level.charAt(0).toUpperCase() + selectedBadge.level.slice(1)}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${selectedBadge.category === "swap"
                                        ? "bg-amber-100 text-amber-800"
                                        : selectedBadge.category === "impact"
                                            ? "bg-green-100 text-green-800"
                                            : selectedBadge.category === "community"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-purple-100 text-purple-800"
                                        }`}
                                >
                                    {selectedBadge.category.charAt(0).toUpperCase() + selectedBadge.category.slice(1)}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedBadge(null)}
                            className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            Back to All Badges
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {earnedBadges.length > 0 ? (
                        <>
                            <h3 className="text-lg font-semibold mb-4">Earned Badges</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                                {earnedBadges.map((badge) => (
                                    <div
                                        key={badge.id}
                                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => setSelectedBadge(badge)}
                                    >
                                        <div
                                            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl border-4 ${getBadgeBorderColor(
                                                badge.level,
                                            )}`}
                                            style={{ backgroundColor: badge.backgroundColor }}
                                        >
                                            {badge.icon}
                                        </div>
                                        <h4 className="font-semibold mt-2 mb-1">{badge.name}</h4>
                                        <p className="text-xs text-gray-500 line-clamp-2">{badge.description}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-6 text-center mb-8">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                                🏆
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No Badges Yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Complete swaps, list items, and participate in the community to earn badges and showcase your
                                environmental impact!
                            </p>
                        </div>
                    )}

                    <h3 className="text-lg font-semibold mb-4">Badges to Earn</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {lockedBadges.map((badge) => (
                            <div
                                key={badge.id}
                                className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 text-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={() => setSelectedBadge(badge)}
                            >
                                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl border-2 border-gray-300 bg-gray-100">
                                    {badge.icon}
                                </div>
                                <div className="absolute top-2 right-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-gray-400"
                                    >
                                        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold mt-2 mb-1 text-gray-500">{badge.name}</h4>
                                <p className="text-xs text-gray-400 line-clamp-2">{badge.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

