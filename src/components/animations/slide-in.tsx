"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface SlideInProps {
    children: React.ReactNode
    direction?: "left" | "right" | "up" | "down"
    delay?: number
    duration?: number
    className?: string
}

export function SlideIn({ children, direction = "left", delay = 0, duration = 0.5, className = "" }: SlideInProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, delay * 1000)

            return () => clearTimeout(timer)
        }
    }, [inView, delay])

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case "left":
                    return "translateX(-50px)"
                case "right":
                    return "translateX(50px)"
                case "up":
                    return "translateY(50px)"
                case "down":
                    return "translateY(-50px)"
                default:
                    return "translateX(-50px)"
            }
        }
        return "translate(0, 0)"
    }

    return (
        <div
            ref={ref}
            className={`transition-all ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    )
}

