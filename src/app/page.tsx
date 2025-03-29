import { Header } from "@/components/header"
import Link from "next/link"
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { FloatingElements } from "@/components/animations/floating-element"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Decorative blobs */}
          <div
            className="absolute top-20 left-20 w-72 h-72 blob-animation"
            style={{ backgroundColor: "rgba(167, 243, 208, 0.5)", borderRadius: "50%", filter: "blur(40px)" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-80 h-80 blob-animation"
            style={{ backgroundColor: "rgba(57, 255, 20, 0.2)", borderRadius: "50%", filter: "blur(40px)" }}
          ></div>

          <FloatingElements />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <FadeIn delay={0.1}>
                <div
                  style={{ backgroundColor: "rgba(74, 222, 128, 0.1)", padding: "0.5rem 1rem", borderRadius: "9999px" }}
                >
                  <span className="text-sm font-medium text-eco-forest">🌱 Sustainable. Social. Simple.</span>
                </div>
              </FadeIn>

              <div className="space-y-4 max-w-4xl">
                <FadeIn delay={0.2}>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="block">Swap, Don't Shop.</span>
                    <span className="gradient-text block">Save The Planet.</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Join the community where you can swap unused items, reduce waste, and earn eco-points for your
                    positive impact.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <RegisterLink>
                    <Button
                      variant="gradient"
                      size="xl"
                      className="shadow-xl font-semibold animate-pulse"
                      style={{
                        boxShadow: "0 20px 25px -5px rgba(74, 222, 128, 0.2), 0 10px 10px -5px rgba(74, 222, 128, 0.1)",
                        animation: "pulse 2s infinite",
                      }}
                    >
                      Get Started — It's Free
                    </Button>
                  </RegisterLink>
                  <Link href="/how-it-works">
                    <Button variant="outline" size="xl" className="font-semibold">
                      See How It Works
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="pt-8 flex items-center gap-2">
                  <div className="flex" style={{ marginRight: "-0.5rem" }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-eco-green flex items-center justify-center text-white text-xs font-bold"
                        style={{ marginLeft: "-0.5rem" }}
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">1,200+</span> people joined this month
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          className="py-16 md:py-24"
          style={{ background: "linear-gradient(to bottom, white, rgba(167, 243, 208, 0.2))" }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <FadeIn>
                <div
                  style={{ backgroundColor: "rgba(74, 222, 128, 0.1)", padding: "0.5rem 1rem", borderRadius: "9999px" }}
                >
                  <span className="text-sm font-medium text-eco-forest">♻️ Simple Process</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How EcoSwap Works</h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                  Three easy steps to start swapping and making a difference.
                </p>
              </FadeIn>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "List Your Items",
                  description: "Snap pics of items you don't need anymore and list them in seconds.",
                  icon: "📸",
                  color: "rgba(57, 255, 20, 0.1)",
                  delay: 0.1,
                },
                {
                  title: "Find Local Matches",
                  description: "Browse items near you and request swaps with other eco-conscious users.",
                  icon: "🔍",
                  color: "rgba(0, 255, 255, 0.1)",
                  delay: 0.2,
                },
                {
                  title: "Swap & Earn Points",
                  description: "Complete swaps, earn eco-points, and track your environmental impact.",
                  icon: "🏆",
                  color: "rgba(255, 16, 240, 0.1)",
                  delay: 0.3,
                },
              ].map((step, i) => (
                <SlideIn key={i} direction="up" delay={step.delay}>
                  <div className="card-hover flex flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-lg">
                    <div className="rounded-full p-4 mb-2" style={{ backgroundColor: step.color }}>
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-500 text-center">{step.description}</p>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <FadeIn>
                <div
                  style={{ backgroundColor: "rgba(74, 222, 128, 0.1)", padding: "0.5rem 1rem", borderRadius: "9999px" }}
                >
                  <span className="text-sm font-medium text-eco-forest">🔄 Popular Categories</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Are People Swapping?</h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                  Browse popular categories and find items you need.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Clothing", icon: "👕", color: "rgba(59, 130, 246, 0.1)", delay: 0.1 },
                { name: "Electronics", icon: "📱", color: "rgba(139, 92, 246, 0.1)", delay: 0.2 },
                { name: "Books", icon: "📚", color: "rgba(245, 158, 11, 0.1)", delay: 0.3 },
                { name: "Home Goods", icon: "🏠", color: "rgba(16, 185, 129, 0.1)", delay: 0.4 },
                { name: "Sports", icon: "🏀", color: "rgba(239, 68, 68, 0.1)", delay: 0.5 },
                { name: "Toys", icon: "🧸", color: "rgba(236, 72, 153, 0.1)", delay: 0.6 },
                { name: "Art", icon: "🎨", color: "rgba(99, 102, 241, 0.1)", delay: 0.7 },
                { name: "Plants", icon: "🌿", color: "rgba(167, 243, 208, 0.5)", delay: 0.8 },
              ].map((category, i) => (
                <FadeIn key={i} delay={category.delay}>
                  <Link
                    href={`/items?category=${category.name.toLowerCase()}`}
                    className="card-hover flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-eco-green transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: category.color }}
                    >
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section
          className="py-16 md:py-24"
          style={{ background: "linear-gradient(to bottom, rgba(167, 243, 208, 0.2), white)" }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <FadeIn>
                <div
                  style={{ backgroundColor: "rgba(74, 222, 128, 0.1)", padding: "0.5rem 1rem", borderRadius: "9999px" }}
                >
                  <span className="text-sm font-medium text-eco-forest">🌍 Our Impact</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Together, We're Making a Difference</h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                  See the collective impact of our community.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Items Swapped", value: "10,000+", icon: "🔄", delay: 0.1 },
                { label: "CO₂ Emissions Saved", value: "5,200 kg", icon: "🌱", delay: 0.2 },
                { label: "Active Community Members", value: "8,500+", icon: "👥", delay: 0.3 },
              ].map((stat, i) => (
                <SlideIn key={i} direction="up" delay={stat.delay}>
                  <div className="card-hover bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-3xl mb-2">{stat.icon}</span>
                      <h3 className="text-4xl font-bold gradient-text mb-2">{stat.value}</h3>
                      <p className="text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "rgba(74, 222, 128, 0.05)" }}>
          <div className="container px-4 md:px-6">
            <FadeIn>
              <div className="gradient-border bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="space-y-4 md:w-2/3">
                    <h2 className="text-3xl font-bold">Ready to Start Swapping?</h2>
                    <p className="text-gray-500 md:text-lg">
                      Join thousands of eco-conscious people making a difference one swap at a time.
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center md:justify-end">
                    <RegisterLink>
                      <Button
                        variant="gradient"
                        size="xl"
                        className="shadow-xl font-semibold w-full md:w-auto animate-pulse"
                        style={{
                          boxShadow:
                            "0 20px 25px -5px rgba(74, 222, 128, 0.2), 0 10px 10px -5px rgba(74, 222, 128, 0.1)",
                          animation: "pulse 2s infinite",
                        }}
                      >
                        Join EcoSwap Now
                      </Button>
                    </RegisterLink>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">EcoSwap</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-eco-green">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/mission" className="text-sm text-gray-500 hover:text-eco-green">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-sm text-gray-500 hover:text-eco-green">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-gray-500 hover:text-eco-green">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-sm text-gray-500 hover:text-eco-green">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-gray-500 hover:text-eco-green">
                    Swap Guides
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-gray-500 hover:text-eco-green">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-gray-500 hover:text-eco-green">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-eco-green">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-eco-green">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-gray-500 hover:text-eco-green">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="text-sm text-gray-500 hover:text-eco-green">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/instagram" className="text-sm text-gray-500 hover:text-eco-green">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="/twitter" className="text-sm text-gray-500 hover:text-eco-green">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/tiktok" className="text-sm text-gray-500 hover:text-eco-green">
                    TikTok
                  </Link>
                </li>
                <li>
                  <Link href="/discord" className="text-sm text-gray-500 hover:text-eco-green">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-sm text-gray-500 md:text-left">© 2025 EcoSwap, Wasim Khan. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-eco-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-eco-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-eco-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

