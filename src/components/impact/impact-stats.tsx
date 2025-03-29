"use client"

import { useEffect, useState } from "react"

interface ImpactStats {
    swapsCompleted: number
    itemsListed: number
    co2Saved: number
    wasteReduced: number
    waterSaved: number
    impactPoints: number
}

export function ImpactStats({ stats }: { stats: ImpactStats }) {
    const [animatedStats, setAnimatedStats] = useState({
        swapsCompleted: 0,
        itemsListed: 0,
        co2Saved: 0,
        wasteReduced: 0,
        waterSaved: 0,
        impactPoints: 0,
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
                swapsCompleted: Math.round(stats.swapsCompleted * progress),
                itemsListed: Math.round(stats.itemsListed * progress),
                co2Saved: Number((stats.co2Saved * progress).toFixed(1)),
                wasteReduced: Number((stats.wasteReduced * progress).toFixed(1)),
                waterSaved: Math.round(stats.waterSaved * progress),
                impactPoints: Math.round(stats.impactPoints * progress),
            })

            if (currentStep === steps) {
                clearInterval(interval)
            }
        }, stepTime)

        return () => clearInterval(interval)
    }, [stats])

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl mx-auto mb-4">
                    🔄
                </div>
                <h3 className="text-2xl font-bold">{animatedStats.swapsCompleted}</h3>
                <p className="text-gray-500 text-sm">Swaps Completed</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl mx-auto mb-4">
                    📦
                </div>
                <h3 className="text-2xl font-bold">{animatedStats.itemsListed}</h3>
                <p className="text-gray-500 text-sm">Items Listed</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl mx-auto mb-4">
                    🌱
                </div>
                <h3 className="text-2xl font-bold">{animatedStats.impactPoints}</h3>
                <p className="text-gray-500 text-sm">Impact Points</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl mx-auto mb-4">
                    🌍
                </div>
                <h3 className="text-2xl font-bold">{animatedStats.co2Saved}</h3>
                <p className="text-gray-500 text-sm">kg CO₂ Saved</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl mx-auto mb-4">
                    🗑️
                </div>
                <h3 className="text-2xl font-bold">{animatedStats.wasteReduced}</h3>
                <p className="text-gray-500 text-sm">kg Waste Reduced</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-forest text-xl mx-auto mb-4">
                    💧
                </div>
                <h3 className="text-2xl font-bold">{animatedStats.waterSaved}</h3>
                <p className="text-gray-500 text-sm">L Water Saved</p>
            </div>
        </div>
    )
}

