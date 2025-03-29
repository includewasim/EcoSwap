import { getUser } from "@/lib/kinde"
import { Header } from "@/components/header"
import { getItemById } from "@/lib/items"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SwapRequestForm } from "@/components/items/swap-request-form"
import { ItemImageGallery } from "@/components/items/item-image-gallery"

export default async function ItemDetail({ params }: { params: { id: string } }) {
  const user = await getUser()
  const item = await getItemById(params.id)

  if (!item) {
    notFound()
  }

  const isOwner = user?.id === item.userId

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link href="/items" className="text-eco-green hover:underline flex items-center gap-1">
              <span>←</span> Back to items
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <ItemImageGallery images={item.images} title={item.title} />

              {/* Item Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-eco-green/10 text-eco-forest px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      Listed {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium">Condition:</span>
                    <span className="text-sm">{item.condition}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{item.description}</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="bg-eco-green/10 text-eco-forest px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-medium mb-2">Listed by:</h3>
                    <div className="flex items-center gap-3">
                      {item.user?.profileImage ? (
                        <img
                          src={item.user.profileImage || "/placeholder.svg"}
                          alt={item.user.firstName || "User"}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-eco-green flex items-center justify-center text-white font-bold">
                          {item.user?.firstName?.[0] || "U"}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {item.user?.firstName} {item.user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Member since {new Date(item.user?.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {user ? (
                  isOwner ? (
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-gray-500 mb-4">This is your item listing.</p>
                      <div className="flex gap-4">
                        <Link href={`/items/${item.id}/edit`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            Edit Listing
                          </Button>
                        </Link>
                        <Button variant="destructive" className="flex-1">
                          Delete Listing
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-semibold mb-4">Interested in this item?</h3>
                      <SwapRequestForm itemId={item.id} receiverId={item.userId} />
                    </div>
                  )
                ) : (
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-500 mb-4">Sign in to request a swap for this item.</p>
                    <Link href="/api/auth/login">
                      <Button variant="gradient" className="w-full shadow-lg shadow-eco-green/20">
                        Sign In to Swap
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

