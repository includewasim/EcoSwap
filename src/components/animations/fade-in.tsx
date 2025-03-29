"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface FadeInProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.5, className = "" }: FadeInProps) {
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

    return (
        <div
            ref={ref}
            className={`transition-opacity ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    )
}

