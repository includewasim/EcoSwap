"use client"

import { useState } from "react"

interface ItemImageGalleryProps {
    images: string[] | null
    title: string
}

export function ItemImageGallery({ images, title }: ItemImageGalleryProps) {
    const [mainImageError, setMainImageError] = useState(false)
    const [thumbnailErrors, setThumbnailErrors] = useState<Record<number, boolean>>({})

    // Function to get a valid image URL or fallback
    const getMainImageUrl = () => {
        if (!images || images.length === 0 || mainImageError) {
            return "/placeholder.svg?height=400&width=400"
        }

        return images[0]
    }

    const getThumbnailUrl = (index: number) => {
        if (!images || thumbnailErrors[index]) {
            return "/placeholder.svg?height=100&width=100"
        }

        return images[index + 1]
    }

    return (
        <div>
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                    src={getMainImageUrl() || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={() => setMainImageError(true)}
                />
            </div>
            {images && images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.slice(1).map((_, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <img
                                src={getThumbnailUrl(index) || "/placeholder.svg"}
                                alt={`${title} - Image ${index + 2}`}
                                className="w-full h-full object-cover"
                                onError={() => setThumbnailErrors((prev) => ({ ...prev, [index]: true }))}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

