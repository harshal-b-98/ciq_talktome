/**
 * ChatWidget Client Component
 * CGL-74: Create ChatWidget client component
 * CGL-75: Design chat UI with message history and input
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { handleChatMessage, getChatHistory } from "@/lib/chat/actions";
import type { ChatMessage } from "@/lib/chat/types";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
    // Generate or retrieve session ID from cookie
    const sid = getOrCreateSessionId();
    setSessionId(sid);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const history = await getChatHistory();
      setMessages(history);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getOrCreateSessionId = (): string => {
    // Simple client-side session ID (would use cookie in production)
    let sid = localStorage.getItem("chat_session_id");
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem("chat_session_id", sid);
    }
    return sid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call Server Action
      const response = await handleChatMessage({
        message: userMessage.content,
        sessionId,
        route: pathname,
        chatHistory: messages,
      });

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: response.messageId,
        role: "assistant",
        content: response.message,
        citations: response.citations,
        timestamp: response.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
          aria-label="Open chat"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-card border rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Chat with ConsumerIQ</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close chat"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p className="mb-2">👋 Hi! How can I help you today?</p>
                <p className="text-sm">
                  Ask me about ConsumerIQ features, pricing, or capabilities.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-xs font-semibold mb-1">Sources:</p>
                      {message.citations.map((citation, idx) => (
                        <a
                          key={idx}
                          href={`#${citation.source}`}
                          className="text-xs underline block"
                        >
                          {citation.source}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                disabled={isLoading}
              />
              <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
