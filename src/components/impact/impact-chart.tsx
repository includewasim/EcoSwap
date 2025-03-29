"use client"

import { useEffect, useRef } from "react"

interface ChartData {
    month: string
    swaps: number
    co2: number
}

export function ImpactChart({ data }: { data: ChartData[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`

        // Chart dimensions
        const padding = 40
        const chartWidth = rect.width - padding * 2
        const chartHeight = rect.height - padding * 2

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Find max values for scaling
        const maxSwaps = Math.max(...data.map((d) => d.swaps), 3) // Minimum of 3 for scale
        const maxCO2 = Math.max(...data.map((d) => d.co2), 15) // Minimum of 15 for scale

        // Draw axes
        ctx.beginPath()
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 1
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, padding + chartHeight)
        ctx.lineTo(padding + chartWidth, padding + chartHeight)
        ctx.stroke()

        // Draw grid lines
        ctx.beginPath()
        ctx.strokeStyle = "#f3f4f6"
        ctx.setLineDash([5, 5])
        for (let i = 1; i <= 5; i++) {
            const y = padding + chartHeight - (i * chartHeight) / 5
            ctx.moveTo(padding, y)
            ctx.lineTo(padding + chartWidth, y)
        }
        ctx.stroke()
        ctx.setLineDash([])

        // Draw x-axis labels
        ctx.fillStyle = "#6b7280"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        data.forEach((d, i) => {
            const x = padding + (i * chartWidth) / (data.length - 1)
            ctx.fillText(d.month, x, padding + chartHeight + 20)
        })

        // Draw y-axis labels
        ctx.textAlign = "right"
        for (let i = 0; i <= 5; i++) {
            const y = padding + chartHeight - (i * chartHeight) / 5
            ctx.fillText(`${Math.round((i * maxSwaps) / 5)}`, padding - 10, y + 4)
            ctx.fillText(`${Math.round((i * maxCO2) / 5)}`, padding + chartWidth + 30, y + 4)
        }

        // Draw y-axis titles
        ctx.save()
        ctx.translate(padding - 30, padding + chartHeight / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = "center"
        ctx.fillText("Swaps", 0, 0)
        ctx.restore()

        ctx.save()
        ctx.translate(padding + chartWidth + 50, padding + chartHeight / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.textAlign = "center"
        ctx.fillText("CO₂ Saved (kg)", 0, 0)
        ctx.restore()

        // Draw swaps line
        ctx.beginPath()
        ctx.strokeStyle = "#4ade80"
        ctx.lineWidth = 3
        data.forEach((d, i) => {
            const x = padding + (i * chartWidth) / (data.length - 1)
            const y = padding + chartHeight - (d.swaps * chartHeight) / maxSwaps
            if (i === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
        })
        ctx.stroke()

        // Draw swaps points
        data.forEach((d, i) => {
            const x = padding + (i * chartWidth) / (data.length - 1)
            const y = padding + chartHeight - (d.swaps * chartHeight) / maxSwaps
            ctx.beginPath()
            ctx.fillStyle = "#4ade80"
            ctx.arc(x, y, 5, 0, Math.PI * 2)
            ctx.fill()
        })

        // Draw CO2 line
        ctx.beginPath()
        ctx.strokeStyle = "#60a5fa"
        ctx.lineWidth = 3
        data.forEach((d, i) => {
            const x = padding + (i * chartWidth) / (data.length - 1)
            const y = padding + chartHeight - (d.co2 * chartHeight) / maxCO2
            if (i === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
        })
        ctx.stroke()

        // Draw CO2 points
        data.forEach((d, i) => {
            const x = padding + (i * chartWidth) / (data.length - 1)
            const y = padding + chartHeight - (d.co2 * chartHeight) / maxCO2
            ctx.beginPath()
            ctx.fillStyle = "#60a5fa"
            ctx.arc(x, y, 5, 0, Math.PI * 2)
            ctx.fill()
        })

        // Draw legend
        const legendX = padding + 10
        const legendY = padding + 20

        // Swaps legend
        ctx.beginPath()
        ctx.fillStyle = "#4ade80"
        ctx.arc(legendX, legendY, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = "#374151"
        ctx.textAlign = "left"
        ctx.fillText("Swaps", legendX + 10, legendY + 4)

        // CO2 legend
        ctx.beginPath()
        ctx.fillStyle = "#60a5fa"
        ctx.arc(legendX + 80, legendY, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = "#374151"
        ctx.fillText("CO₂ Saved (kg)", legendX + 90, legendY + 4)
    }, [data])

    return (
        <div className="w-full h-80">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
    )
}

