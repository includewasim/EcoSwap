import { getUser } from "@/lib/kinde"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImpactStats } from "@/components/impact/impact-stats"
import { ImpactChart } from "@/components/impact/impact-chart"
import { CommunityImpact } from "@/components/impact/community-impact"
import { BadgeShowcase } from "@/components/impact/badge-showcase"

export default async function Impact() {
    const user = await getUser()

    if (!user) {
        redirect("/api/auth/login")
    }

    // In a real app, you would fetch these stats from your database
    const userStats = {
        swapsCompleted: 5,
        itemsListed: 8,
        co2Saved: 26.0, // kg
        wasteReduced: 12.5, // kg
        waterSaved: 2350, // liters
        impactPoints: 120,
    }

    // Mock data for the impact chart
    const chartData = [
        { month: "Jan", swaps: 0, co2: 0 },
        { month: "Feb", swaps: 1, co2: 5.2 },
        { month: "Mar", swaps: 2, co2: 10.4 },
        { month: "Apr", swaps: 1, co2: 5.2 },
        { month: "May", swaps: 1, co2: 5.2 },
        { month: "Jun", swaps: 0, co2: 0 },
    ]

    // Mock data for community impact
    const communityStats = {
        totalSwaps: 10542,
        totalUsers: 8745,
        totalCo2Saved: 54818.4, // kg
        totalWasteReduced: 52710, // kg
        totalWaterSaved: 24568350, // liters
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 container py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold gradient-text">Your Environmental Impact</h1>
                            <p className="text-gray-500 mt-1">Track the positive change you're making through swapping</p>
                        </div>
                        <Link href="/items">
                            <Button
                                variant="gradient"
                                size="lg"
                                className="shadow-lg"
                                style={{
                                    boxShadow: "0 10px 15px -3px rgba(74, 222, 128, 0.2), 0 4px 6px -2px rgba(74, 222, 128, 0.1)",
                                }}
                            >
                                Increase Your Impact
                            </Button>
                        </Link>
                    </div>

                    {/* User Impact Stats */}
                    <ImpactStats stats={userStats} />

                    {/* Impact Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold">Your Impact Over Time</h2>
                        </div>
                        <div className="p-6">
                            <ImpactChart data={chartData} />
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold">Your Badges</h2>
                        </div>
                        <div className="p-6">
                            <BadgeShowcase userId={user.id} />
                        </div>
                    </div>

                    {/* Community Impact */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold">Community Impact</h2>
                        </div>
                        <div className="p-6">
                            <CommunityImpact stats={communityStats} />
                        </div>
                    </div>

                    {/* Educational Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold">Why Swapping Matters</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl">
                                        🌍
                                    </div>
                                    <h3 className="text-lg font-semibold">Reduces Carbon Emissions</h3>
                                    <p className="text-gray-500">
                                        Manufacturing new products is responsible for a significant portion of global carbon emissions.
                                        Reusing existing items prevents these emissions.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl">
                                        💧
                                    </div>
                                    <h3 className="text-lg font-semibold">Conserves Water</h3>
                                    <p className="text-gray-500">
                                        Production of new goods requires enormous amounts of water. For example, a single cotton t-shirt
                                        needs about 2,700 liters of water to produce.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl">
                                        🗑️
                                    </div>
                                    <h3 className="text-lg font-semibold">Reduces Landfill Waste</h3>
                                    <p className="text-gray-500">
                                        The average person throws away 81 pounds of clothing each year. Swapping keeps usable items out of
                                        landfills and in circulation.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-eco-green/5 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Did You Know?</h3>
                                <p className="text-gray-700">
                                    If everyone in the US swapped just one item instead of buying new, it would save the equivalent of
                                    taking 500,000 cars off the road for a year in terms of carbon emissions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

