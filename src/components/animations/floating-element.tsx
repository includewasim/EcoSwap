"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
    id: number
    x: number
    y: number
    size: number
    color: string
    speed: number
    direction: number
}

export function FloatingElements() {
    const [elements, setElements] = useState<FloatingElement[]>([])

    useEffect(() => {
        // Create random floating elements
        const colors = [
            "rgba(74, 222, 128, 0.2)",
            "rgba(167, 243, 208, 0.3)",
            "rgba(57, 255, 20, 0.15)",
            "rgba(34, 197, 94, 0.2)",
        ]

        const newElements: FloatingElement[] = []

        for (let i = 0; i < 15; i++) {
            newElements.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 40 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 0.5 + 0.1,
                direction: Math.random() > 0.5 ? 1 : -1,
            })
        }

        setElements(newElements)

        // Animate the elements
        const interval = setInterval(() => {
            setElements((prevElements) =>
                prevElements.map((element) => {
                    const newX = element.x + element.speed * element.direction

                    // Bounce off the edges
                    if (newX > 100 || newX < 0) {
                        return {
                            ...element,
                            direction: -element.direction,
                            x: newX > 100 ? 100 : 0,
                        }
                    }

                    return {
                        ...element,
                        x: newX,
                    }
                }),
            )
        }, 50)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {elements.map((element) => (
                <div
                    key={element.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        width: `${element.size}px`,
                        height: `${element.size}px`,
                        backgroundColor: element.color,
                        filter: "blur(8px)",
                        opacity: 0.7,
                        transition: "left 2s ease-in-out",
                    }}
                />
            ))}
        </div>
    )
}

