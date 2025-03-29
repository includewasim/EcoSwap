"use client"

import { useState } from "react"

interface UserAvatarProps {
    profileImage?: string | null
    firstName?: string | null
    size?: "sm" | "md" | "lg"
}

export function UserAvatar({ profileImage, firstName, size = "md" }: UserAvatarProps) {
    const [imageError, setImageError] = useState(false)

    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-20 w-20 text-2xl border-4 border-eco-green",
    }

    if (profileImage && !imageError) {
        return (
            <img
                src={profileImage || "/placeholder.svg"}
                alt={firstName || "User"}
                className={`${sizeClasses[size]} rounded-full`}
                onError={() => setImageError(true)}
            />
        )
    }

    return (
        <div
            className={`${sizeClasses[size]} rounded-full bg-eco-green flex items-center justify-center text-white font-bold`}
        >
            {firstName?.[0] || "U"}
        </div>
    )
}

