import { getUser } from "@/lib/kinde"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getItems } from "@/lib/items"
import { getSwapRequests } from "@/lib/swaps"
import { ItemCard } from "@/components/items/item-card"
import { DbError } from "@/components/db-error"
import { UserAvatar } from "@/components/user-avatar"

export default async function Dashboard() {
  try {
    const user = await getUser()

    if (!user) {
      redirect("/api/auth/login")
    }

    // Fetch user's items and swap requests
    const userItems = await getItems({ userId: user.id })
    const { sent: sentRequests, received: receivedRequests } = await getSwapRequests(user.id)

    // Calculate stats
    const itemsCount = userItems.length
    const swapsCompletedCount = [...sentRequests, ...receivedRequests].filter(
      (req) => req.status === "completed",
    ).length
    const impactPoints = 0 // This would come from the user profile in a real implementation
    const co2Saved = swapsCompletedCount * 5.2 // Assuming 5.2kg CO2 saved per swap

    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Hey, {user.given_name || "Eco-Warrior"}! 👋</h1>
              <p className="text-gray-500 mt-1">Welcome to your sustainable swapping journey</p>
            </div>
            <Link href="/items/new">
              <Button
                variant="gradient"
                size="lg"
                className="shadow-lg"
                style={{
                  boxShadow: "0 10px 15px -3px rgba(74, 222, 128, 0.2), 0 4px 6px -2px rgba(74, 222, 128, 0.1)",
                }}
              >
                + List New Item
              </Button>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Items Listed", value: itemsCount.toString(), icon: "📦", color: "rgba(59, 130, 246, 0.1)" },
              {
                label: "Swaps Completed",
                value: swapsCompletedCount.toString(),
                icon: "🔄",
                color: "rgba(16, 185, 129, 0.1)",
              },
              { label: "Impact Points", value: impactPoints.toString(), icon: "🌱", color: "rgba(167, 243, 208, 0.5)" },
              { label: "CO₂ Saved", value: `${co2Saved.toFixed(1)} kg`, icon: "🌍", color: "rgba(139, 92, 246, 0.1)" },
            ].map((stat, i) => (
              <div key={i} className="card-hover bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: stat.color }}
                  >
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions and Your Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                  {[
                    {
                      title: "List an Item",
                      description: "Got something you don't need? List it for swapping!",
                      icon: "📸",
                      link: "/items/new",
                      color: "bg-eco-green/10 text-eco-forest",
                    },
                    {
                      title: "Browse Items",
                      description: "Find items to swap in your local community.",
                      icon: "🔍",
                      link: "/items",
                      color: "bg-blue-100 text-blue-700",
                    },
                    {
                      title: "View Swaps",
                      description: "Check your ongoing and completed swaps.",
                      icon: "🔄",
                      link: "/swaps",
                      color: "bg-purple-100 text-purple-700",
                    },
                    {
                      title: "Edit Profile",
                      description: "Update your profile and preferences.",
                      icon: "👤",
                      link: "/profile",
                      color: "bg-yellow-100 text-yellow-700",
                    },
                  ].map((action, i) => (
                    <Link
                      href={action.link}
                      key={i}
                      className="card-hover flex flex-col p-4 rounded-lg border border-gray-100 hover:border-eco-green transition-all"
                    >
                      <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center mb-3`}>
                        <span className="text-xl">{action.icon}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Your Items */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Your Items</h2>
                  <Link href={`/items?userId=${user.id}`}>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="p-6">
                  {userItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {userItems.slice(0, 4).map((item) => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">📦</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Items Listed Yet</h3>
                      <p className="text-gray-500 max-w-md mb-6">
                        Start your sustainable journey by listing items you no longer need.
                      </p>
                      <Link href="/items/new">
                        <Button variant="gradient">List Your First Item</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Swap Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Recent Swap Activity</h2>
                </div>
                <div className="p-6">
                  {sentRequests.length > 0 || receivedRequests.length > 0 ? (
                    <div className="space-y-4">
                      {[...sentRequests, ...receivedRequests]
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 3)
                        .map((request) => (
                          <Link href={`/swaps/${request.id}`} key={request.id} className="block">
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                {request.item.images && request.item.images.length > 0 ? (
                                  <div className="w-full h-full bg-gray-200">
                                    <img
                                      src={request.item.images[0] || "/placeholder.svg?height=48&width=48"}
                                      alt={request.item.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-xl">📷</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{request.item.title}</p>
                                <p className="text-sm text-gray-500">
                                  {request.requesterId === user.id ? "You requested" : "Requested from you"} •
                                  <span
                                    className={`ml-1 ${request.status === "pending"
                                      ? "text-yellow-600"
                                      : request.status === "accepted"
                                        ? "text-green-600"
                                        : request.status === "rejected"
                                          ? "text-red-600"
                                          : "text-blue-600"
                                      }`}
                                  >
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                  </span>
                                </p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(request.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </Link>
                        ))}
                      <div className="text-center pt-2">
                        <Link href="/swaps" className="text-sm text-eco-green hover:underline">
                          View all swap requests →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🔄</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Swap Activity Yet</h3>
                      <p className="text-gray-500 max-w-md mb-6">
                        Your recent swaps and interactions will appear here. Start by browsing available items!
                      </p>
                      <Link href="/items">
                        <Button variant="outline">Browse Items</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Your Profile</h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <UserAvatar profileImage={user.picture} firstName={user.given_name} size="lg" />
                    <h3 className="text-lg font-semibold mt-4">
                      {user.given_name} {user.family_name}
                    </h3>
                    <p className="text-gray-500 mb-4">{user.email}</p>
                    <Link href="/profile">
                      <Button variant="outline" size="sm">
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Your Badges</h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">🏆</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Badges Yet</h3>
                    <p className="text-gray-500 max-w-md">
                      Complete swaps and eco-actions to earn badges and showcase your impact!
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact Tracker */}
              <div className="bg-gradient-to-br from-eco-green to-eco-forest rounded-xl shadow-lg overflow-hidden text-white">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold">Your Impact</h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">🌱</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Start Your Impact Journey</h3>
                    <p className="text-white/80 max-w-md mb-4">
                      Every swap helps reduce waste and carbon emissions. Track your positive impact on the planet!
                    </p>
                    <Link href="/impact">
                      <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        View Impact Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  } catch (error) {
    console.error("Dashboard error:", error)
    return <DbError error={error instanceof Error ? error : new Error("Unknown error")} />
  }
}

