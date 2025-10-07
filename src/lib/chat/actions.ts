/**
 * Chat Server Actions
 * CGL-76: Implement Server Action for chat message handling
 */

"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { ChatRequest, ChatResponse, ChatMessage } from "./types";
import { getServerSession } from "../server/session";
import { addInteraction } from "../session/cookie-session";
import { v4 as uuidv4 } from "uuid";

/**
 * Handle chat message and return AI response
 * CGL-76: Server Action for chat message handling
 */
export async function handleChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  try {
    // Get session for context
    const session = await getServerSession();

    // Build chat prompt with context (CGL-77)
    const prompt = buildChatPrompt(request);

    // Generate response using OpenAI (CGL-79)
    const { text } = await generateText({
      model: openai("gpt-4"),
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for ConsumerIQ, a consumer intelligence platform. Answer questions about ConsumerIQ features, capabilities, and use cases. Be concise and helpful. If you don't know something, say so.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    // Extract persona signals from user message (CGL-83)
    const personaSignals = extractPersonaSignals(request.message);

    // Log chat interaction to session (CGL-81)
    // Note: With cookie-based sessions, we only track that a chat occurred
    // Full message history is managed client-side to stay within 4KB cookie limit
    await addInteraction("chat", request.route);

    const messageId = uuidv4();
    const timestamp = new Date();

    return {
      message: text,
      citations: [], // Will be enhanced in CGL-80
      messageId,
      timestamp,
      success: true,
    };
  } catch (error) {
    console.error("Chat error:", error);
    return {
      message: "I'm sorry, I encountered an error. Please try again.",
      citations: [],
      messageId: uuidv4(),
      timestamp: new Date(),
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Build chat prompt with context
 * CGL-77: Chat prompt composition with context
 */
function buildChatPrompt(request: ChatRequest): string {
  const { message, route, chatHistory } = request;

  let prompt = `Current page: ${route}\n\n`;

  // Add chat history for context
  if (chatHistory && chatHistory.length > 0) {
    prompt += "Previous conversation:\n";
    const recentHistory = chatHistory.slice(-3); // Last 3 messages
    for (const msg of recentHistory) {
      prompt += `${msg.role}: ${msg.content}\n`;
    }
    prompt += "\n";
  }

  prompt += `User question: ${message}`;

  return prompt;
}

/**
 * Extract persona signals from chat message
 * CGL-83: Persona signal extraction from chat
 */
function extractPersonaSignals(message: string): string[] {
  const signals: string[] = [];
  const lowerMessage = message.toLowerCase();

  // Brand Manager signals
  if (
    lowerMessage.includes("brand") ||
    lowerMessage.includes("marketing") ||
    lowerMessage.includes("campaign")
  ) {
    signals.push("brand_manager_interest");
  }

  // Data Analyst signals
  if (
    lowerMessage.includes("data") ||
    lowerMessage.includes("analytics") ||
    lowerMessage.includes("report") ||
    lowerMessage.includes("dashboard")
  ) {
    signals.push("data_analyst_interest");
  }

  // Executive signals
  if (
    lowerMessage.includes("roi") ||
    lowerMessage.includes("pricing") ||
    lowerMessage.includes("enterprise") ||
    lowerMessage.includes("cost")
  ) {
    signals.push("executive_interest");
  }

  // Researcher signals
  if (
    lowerMessage.includes("research") ||
    lowerMessage.includes("study") ||
    lowerMessage.includes("insights") ||
    lowerMessage.includes("trends")
  ) {
    signals.push("researcher_interest");
  }

  return signals;
}

/**
 * Get chat history from session
 * CGL-82: Chat history retrieval from session
 *
 * Note: With cookie-based sessions (iron-session), we don't store full chat
 * message history due to the 4KB cookie limit. Chat history is managed
 * client-side in the ChatWidget component using localStorage or state.
 *
 * This function returns an empty array but can be enhanced in the future
 * to return the last 2-3 messages if needed.
 */
export async function getChatHistory(): Promise<ChatMessage[]> {
  try {
    const session = await getServerSession();

    // Cookie-based session only tracks that chats occurred, not full content
    // Full message history is managed client-side
    // We can see how many chat interactions happened:
    const chatCount = session.recentInteractions.filter(
      (interaction) => interaction.type === "chat"
    ).length;

    console.log(`Session has ${chatCount} chat interactions recorded`);

    // Return empty array - client manages full history
    return [];
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return [];
  }
}
