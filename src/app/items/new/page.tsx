import { getUser } from "@/lib/kinde"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { ItemForm } from "@/components/items/item-form"

export default async function NewItem() {
  const user = await getUser()

  if (!user) {
    redirect("/api/auth/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">List a New Item</h1>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <ItemForm userId={user.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

