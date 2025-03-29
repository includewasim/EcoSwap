import { Header } from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-4 mb-12">
                            <div
                                style={{ backgroundColor: "rgba(74, 222, 128, 0.1)", padding: "0.5rem 1rem", borderRadius: "9999px" }}
                            >
                                <span className="text-sm font-medium text-eco-forest">♻️ Simple Process</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                How <span className="gradient-text">EcoSwap</span> Works
                            </h1>
                            <p className="text-gray-500 md:text-xl max-w-[800px]">
                                Our platform makes it easy to swap items, reduce waste, and make a positive impact on the environment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="space-y-20">
                                {/* Step 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="order-2 md:order-1">
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green text-white font-bold text-xl">
                                                1
                                            </div>
                                            <h2 className="text-3xl font-bold">Create Your Account</h2>
                                            <p className="text-gray-500">
                                                Sign up for free in seconds. We use secure authentication to protect your information while
                                                keeping the process simple.
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Quick and easy registration</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Secure login options</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Create your eco-friendly profile</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="order-1 md:order-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                            <img
                                                src="/placeholder.svg?height=400&width=600&text=Create+Account"
                                                alt="Create account illustration"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                            <img
                                                src="/placeholder.svg?height=400&width=600&text=List+Items"
                                                alt="List items illustration"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green text-white font-bold text-xl">
                                                2
                                            </div>
                                            <h2 className="text-3xl font-bold">List Your Items</h2>
                                            <p className="text-gray-500">
                                                Take photos of items you no longer need and create listings in minutes. Add details to help
                                                others understand what you're offering.
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Simple item upload process</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Add multiple photos and descriptions</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Tag items for better discoverability</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="order-2 md:order-1">
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green text-white font-bold text-xl">
                                                3
                                            </div>
                                            <h2 className="text-3xl font-bold">Browse & Request Swaps</h2>
                                            <p className="text-gray-500">
                                                Explore items in your community that interest you. When you find something you like, send a swap
                                                request to the owner.
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Filter items by category and location</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Send personalized swap requests</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Offer your own items in exchange</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="order-1 md:order-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                            <img
                                                src="/placeholder.svg?height=400&width=600&text=Browse+and+Request"
                                                alt="Browse and request illustration"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                            <img
                                                src="/placeholder.svg?height=400&width=600&text=Communicate"
                                                alt="Communicate illustration"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green text-white font-bold text-xl">
                                                4
                                            </div>
                                            <h2 className="text-3xl font-bold">Communicate & Arrange</h2>
                                            <p className="text-gray-500">
                                                Chat with other users through our secure messaging system. Arrange the details of your swap,
                                                including when and where to meet.
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>In-app messaging system</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Coordinate swap details safely</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Accept or decline swap requests</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 5 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="order-2 md:order-1">
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eco-green text-white font-bold text-xl">
                                                5
                                            </div>
                                            <h2 className="text-3xl font-bold">Complete the Swap</h2>
                                            <p className="text-gray-500">
                                                Meet up and exchange items. After the swap is complete, mark it as finished in the app to earn
                                                eco-points and badges.
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Meet safely to exchange items</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Mark swaps as completed</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-eco-green mr-2">✓</span>
                                                    <span>Earn impact points and badges</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="order-1 md:order-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                        <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                            <img
                                                src="/placeholder.svg?height=400&width=600&text=Complete+Swap"
                                                alt="Complete swap illustration"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Safety Tips */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                                <div
                                    style={{
                                        backgroundColor: "rgba(74, 222, 128, 0.1)",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "9999px",
                                    }}
                                >
                                    <span className="text-sm font-medium text-eco-forest">🛡️ Swap Safely</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Safety Tips</h2>
                                <p className="text-gray-500 md:text-lg max-w-[700px]">
                                    We want your swapping experience to be safe and enjoyable. Here are some tips to keep in mind.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl">
                                            🔍
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Verify Users</h3>
                                            <p className="text-gray-500">
                                                Check user profiles and ratings before agreeing to a swap. Users with complete profiles and
                                                positive swap history are typically more reliable.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                                            💬
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Communicate Clearly</h3>
                                            <p className="text-gray-500">
                                                Use our in-app messaging to discuss all details. Be clear about the condition of items and
                                                expectations for the swap.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
                                            🏙️
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Meet in Public Places</h3>
                                            <p className="text-gray-500">
                                                Always meet in well-lit, public locations like coffee shops or community centers. Consider
                                                bringing a friend for additional safety.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
                                            ⚖️
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">Inspect Before Swapping</h3>
                                            <p className="text-gray-500">
                                                Take time to inspect items before completing the swap. Make sure they match the description and
                                                photos from the listing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                                <div
                                    style={{
                                        backgroundColor: "rgba(74, 222, 128, 0.1)",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "9999px",
                                    }}
                                >
                                    <span className="text-sm font-medium text-eco-forest">❓ Common Questions</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Frequently Asked Questions</h2>
                                <p className="text-gray-500 md:text-lg max-w-[700px]">
                                    Have questions about how EcoSwap works? Find answers to common questions below.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold mb-2">Is EcoSwap completely free to use?</h3>
                                    <p className="text-gray-500">
                                        Yes! EcoSwap is 100% free to use. We believe in making sustainable choices accessible to everyone.
                                        There are no hidden fees or premium features that cost money.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold mb-2">What kinds of items can I swap?</h3>
                                    <p className="text-gray-500">
                                        You can swap almost any physical item that's in good, usable condition. Popular categories include
                                        clothing, books, electronics, home goods, toys, and plants. We prohibit illegal items, hazardous
                                        materials, and perishable goods.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold mb-2">Do I have to offer an item to request a swap?</h3>
                                    <p className="text-gray-500">
                                        While offering an item in return is encouraged, it's not required. Some users are happy to give
                                        items away without receiving anything in return. You can indicate in your swap request whether
                                        you're offering an item or simply requesting one.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold mb-2">How does EcoSwap calculate environmental impact?</h3>
                                    <p className="text-gray-500">
                                        We calculate environmental impact based on research about the carbon footprint of manufacturing new
                                        items versus reusing existing ones. Each swap prevents new production and waste, which we convert
                                        into metrics like CO₂ saved, water conserved, and waste diverted from landfills.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold mb-2">What if someone doesn't show up for a swap?</h3>
                                    <p className="text-gray-500">
                                        If someone doesn't show up for a scheduled swap, you can mark the swap as "failed" in the app. This
                                        helps us maintain community accountability. Users who repeatedly fail to complete swaps may have
                                        their accounts restricted.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold mb-2">How do I earn badges and eco-points?</h3>
                                    <p className="text-gray-500">
                                        You earn eco-points for every completed swap, with bonus points for certain actions like swapping
                                        high-impact items or being active in the community. Badges are awarded for reaching milestones, such
                                        as completing your first swap, saving a certain amount of CO₂, or being a member for a specific
                                        period.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="gradient-border bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                                    <div className="space-y-4 md:w-2/3">
                                        <h2 className="text-3xl font-bold">Ready to Start Swapping?</h2>
                                        <p className="text-gray-500 md:text-lg">
                                            Join thousands of eco-conscious people making a difference one swap at a time.
                                        </p>
                                    </div>
                                    <div className="md:w-1/3 flex justify-center md:justify-end">
                                        <Link href="/api/auth/register">
                                            <Button
                                                variant="gradient"
                                                size="xl"
                                                className="shadow-xl font-semibold w-full md:w-auto"
                                                style={{
                                                    boxShadow:
                                                        "0 20px 25px -5px rgba(74, 222, 128, 0.2), 0 10px 10px -5px rgba(74, 222, 128, 0.1)",
                                                }}
                                            >
                                                Join EcoSwap Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

