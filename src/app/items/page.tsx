import { getUser } from "@/lib/kinde"
import { Header } from "@/components/header"
import { getItems } from "@/lib/items"
import { ItemCard } from "@/components/items/item-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Items({
  searchParams,
}: {
  searchParams: { category?: string; q?: string }
}) {
  const user = await getUser()
  const items = await getItems({
    category: searchParams.category,
    query: searchParams.q,
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Browse Items</h1>
            <p className="text-gray-500 mt-1">
              Find items to swap in your local community
            </p>
          </div>
          {user && (
            <Link href="/items/new">
              <Button variant="gradient" size="lg" className="shadow-lg shadow-eco-green/20">
                + List New Item
              </Button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <form>
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search items..."
                    defaultValue={searchParams.q || ""}
                    className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-eco-green"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">
                    🔍
                  </span>
                </div>
              </form>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {["All", "Clothing", "Electronics", "Books", "Home Goods", "Sports", "Toys", "Art", "Plants"].map((category) => (
                <Link
                  key={category}
                  href={category === "All" ? "/items" : `/items?category=${category}`}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${(category === "All" && !searchParams.category) ||
                      searchParams.category === category
                      ? "bg-eco-green text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-lg font-medium mb-2">No Items Found</h3>
              <p className="text-gray-500 max-w-md mb-6">
                {searchParams.category || searchParams.q
                  ? "Try adjusting your search or filters to find more items."
                  : "Be the first to list items in this category! Share what you no longer need."}
              </p>
              <Link href="/items/new">
                <Button variant="gradient">List an Item</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

