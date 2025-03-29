"use client"

import Link from "next/link"
import type { Item, User } from "@prisma/client"
import { useState } from "react"

interface ItemCardProps {
  item: Item & {
    user?: User
  }
}

export function ItemCard({ item }: ItemCardProps) {
  const [imageError, setImageError] = useState(false)

  // Function to get a valid image URL or fallback
  const getImageUrl = () => {
    if (!item.images || item.images.length === 0 || imageError) {
      return "/placeholder.svg?height=300&width=300"
    }

    // Return the first image URL
    return item.images[0]
  }

  return (
    <Link href={`/items/${item.id}`} className="group">
      <div className="card-hover bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square">
          {item.images && item.images.length > 0 ? (
            <img
              src={getImageUrl() || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📷</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            {item.condition}
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.title}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1 mb-2">
              {item.tags &&
                item.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-eco-green/10 text-eco-forest px-2 py-0.5 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              {item.tags && item.tags.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  +{item.tags.length - 3} more
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
              <span className="text-xs font-medium text-eco-forest">Available for Swap</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

