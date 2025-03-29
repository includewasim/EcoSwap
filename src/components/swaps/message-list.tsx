"use client"

import type { Message } from "@prisma/client"
import { useEffect, useRef } from "react"

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No messages yet. Start the conversation!</p>
      </div>
    )
  }

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {}
  messages.forEach((message) => {
    const date = new Date(message.createdAt).toLocaleDateString()
    if (!groupedMessages[date]) {
      groupedMessages[date] = []
    }
    groupedMessages[date].push(message)
  })

  return (
    <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4">
          <div className="flex justify-center">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{date}</span>
          </div>

          {dateMessages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId
            const time = new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })

            return (
              <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${isCurrentUser ? "bg-eco-green text-white" : "bg-gray-100 text-gray-800"
                    }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <p className={`text-xs mt-1 ${isCurrentUser ? "text-white/70" : "text-gray-500"}`}>{time}</p>
                </div>
              </div>
            )
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

