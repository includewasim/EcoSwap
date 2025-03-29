"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DbErrorProps {
    error: Error
}

export function DbError({ error }: DbErrorProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-500 text-2xl">⚠️</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Database Connection Error</h1>
                <p className="text-gray-600 mb-6">We're having trouble connecting to our database. This might be due to:</p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                    <li>• Temporary database server downtime</li>
                    <li>• Network connectivity issues</li>
                    <li>• Database configuration problems</li>
                </ul>
                <div className="space-y-4">
                    <Button onClick={() => window.location.reload()} variant="gradient" className="w-full">
                        Try Again
                    </Button>
                    <Link href="/" className="block text-sm text-eco-green hover:underline">
                        Return to Home Page
                    </Link>
                </div>
                {process.env.NODE_ENV === "development" && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-md text-left">
                        <p className="text-xs text-gray-700 font-mono overflow-auto">{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

