"use client"

import { useEffect, useState } from "react"

interface CommunityStats {
    totalSwaps: number
    totalUsers: number
    totalCo2Saved: number
    totalWasteReduced: number
    totalWaterSaved: number
}

export function CommunityImpact({ stats }: { stats: CommunityStats }) {
    const [animatedStats, setAnimatedStats] = useState({
        totalSwaps: 0,
        totalUsers: 0,
        totalCo2Saved: 0,
        totalWasteReduced: 0,
        totalWaterSaved: 0,
    })

    useEffect(() => {
        // Animate the stats counting up
        const duration = 2000 // 2 seconds
        const steps = 20
        const stepTime = duration / steps

        let currentStep = 0
        const interval = setInterval(() => {
            currentStep++
            const progress = currentStep / steps

            setAnimatedStats({
                totalSwaps: Math.round(stats.totalSwaps * progress),
                totalUsers: Math.round(stats.totalUsers * progress),
                totalCo2Saved: Math.round(stats.totalCo2Saved * progress),
                totalWasteReduced: Math.round(stats.totalWasteReduced * progress),
                totalWaterSaved: Math.round(stats.totalWaterSaved * progress),
            })

            if (currentStep === steps) {
                clearInterval(interval)
            }
        }, stepTime)

        return () => clearInterval(interval)
    }, [stats])

    // Calculate equivalent metrics for better understanding
    const carEquivalent = Math.round(animatedStats.totalCo2Saved / 4600) // Average car emits 4.6 tonnes CO2 per year
    const showerEquivalent = Math.round(animatedStats.totalWaterSaved / 65) // Average shower uses 65 liters
    const trashBagEquivalent = Math.round(animatedStats.totalWasteReduced / 5) // Average trash bag is 5kg

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-eco-green/10 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-eco-forest mb-2">{animatedStats.totalSwaps.toLocaleString()}</div>
                    <p className="text-gray-700">Total Swaps Completed</p>
                </div>

                <div className="bg-eco-green/10 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-eco-forest mb-2">{animatedStats.totalUsers.toLocaleString()}</div>
                    <p className="text-gray-700">Active Community Members</p>
                </div>

                <div className="bg-eco-green/10 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-eco-forest mb-2">
                        {(animatedStats.totalCo2Saved / 1000).toFixed(1)}
                    </div>
                    <p className="text-gray-700">Tonnes of CO₂ Saved</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-4">What Our Impact Means</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-2xl">
                            🚗
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{carEquivalent}</div>
                            <p className="text-gray-500">Cars off the road for a year</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-2xl">
                            🚿
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{showerEquivalent.toLocaleString()}</div>
                            <p className="text-gray-500">Showers worth of water saved</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-2xl">
                            🗑️
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{trashBagEquivalent.toLocaleString()}</div>
                            <p className="text-gray-500">Trash bags kept from landfills</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-eco-green to-eco-forest rounded-xl p-6 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Together, We're Making a Difference</h3>
                        <p className="opacity-90">
                            Every swap contributes to a more sustainable future. Thank you for being part of the solution!
                        </p>
                    </div>
                    <div className="text-5xl">🌎</div>
                </div>
            </div>
        </div>
    )
}

