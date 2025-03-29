"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const CONDITIONS = ["New", "Like New", "Good", "Fair", "Worn"]
const CATEGORIES = ["Clothing", "Electronics", "Books", "Home Goods", "Sports", "Toys", "Art", "Plants", "Other"]

interface ItemFormProps {
  userId: string
}

export function ItemForm({ userId }: ItemFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [uploadingImage, setUploadingImage] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)

    try {
      // For each file, create a temporary preview URL
      const tempImageUrls = Array.from(files).map((file) => URL.createObjectURL(file))

      // Add these temporary URLs to the state for immediate preview
      setImages([...images, ...tempImageUrls])

      // In a real app, you would upload each file to a storage service
      // For this demo, we'll use our mock upload API
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          // In a real implementation, you would create a FormData object and send the file
          // For this demo, we'll just call our mock API
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ filename: file.name }),
          })

          if (!response.ok) {
            throw new Error("Failed to upload image")
          }

          const data = await response.json()
          return data.url
        }),
      )

      // Replace the temporary URLs with the real ones
      // In a real app, you would use the URLs returned by your storage service
      setImages((prev) => {
        // Keep any previously uploaded images
        const oldImages = prev.slice(0, prev.length - tempImageUrls.length)
        // Add the newly uploaded images
        return [...oldImages, ...uploadedUrls]
      })
    } catch (error) {
      console.error("Error uploading images:", error)
      setError("Failed to upload images. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/items/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          condition: formData.get("condition") as string,
          category: formData.get("category") as string,
          tags,
          images, // These are now the URLs from our mock upload API
          userId,
          latitude: 0, // In a real app, you would get the user's location
          longitude: 0,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create item")
      }

      if (data.success) {
        router.push("/dashboard")
        router.refresh()
      } else {
        throw new Error(data.error || "Unknown error")
      }
    } catch (error) {
      console.error("Error creating item:", error)
      setError(error instanceof Error ? error.message : "Failed to create item")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
            placeholder="What are you swapping?"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
            placeholder="Tell others about your item. Include details like size, brand, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
              Condition *
            </label>
            <select
              id="condition"
              name="condition"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
            >
              <option value="">Select condition</option>
              {CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div key={index} className="bg-eco-green/10 text-eco-forest px-3 py-1 rounded-full flex items-center">
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-2 text-eco-forest hover:text-eco-forest/70"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
              placeholder="Add tags (e.g., vintage, handmade)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-eco-green text-white px-4 py-2 rounded-r-md hover:bg-eco-forest transition-colors"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Press Enter or click Add to add a tag</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images *</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Item preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-100"
                >
                  &times;
                </button>
              </div>
            ))}
            {images.length === 0 && (
              <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-md text-center">
                <p className="text-gray-500">No images uploaded yet</p>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <label className="block">
              <span className="sr-only">Choose files</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-eco-green/10 file:text-eco-forest
                  hover:file:bg-eco-green/20
                  cursor-pointer"
              />
            </label>
            {uploadingImage && <span className="ml-3 text-sm text-gray-500">Uploading...</span>}
          </div>
          <p className="text-xs text-gray-500 mt-1">Upload clear photos of your item. You can add multiple images.</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="gradient"
          disabled={isSubmitting || images.length === 0}
          className="shadow-lg shadow-eco-green/20"
        >
          {isSubmitting ? "Creating..." : "Create Listing"}
        </Button>
      </div>
    </form>
  )
}

