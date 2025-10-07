/**
 * Chat Server Actions
 * CGL-76: Implement Server Action for chat message handling
 */

"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { ChatRequest, ChatResponse, ChatMessage } from "./types";
import { getServerSession } from "../server/session";
import { logInteraction } from "../session/utils";
import { InteractionType, type ChatInteraction } from "../session/types";
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
    await logInteraction(
      InteractionType.CHAT,
      request.route,
      {
        message: request.message,
        response: text,
      } as unknown as ChatInteraction
    );

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
 */
export async function getChatHistory(): Promise<ChatMessage[]> {
  try {
    const session = await getServerSession();

    // Filter chat interactions from session
    const chatInteractions = session.interactions.filter(
      (interaction) => interaction.type === InteractionType.CHAT
    );

    // Convert to ChatMessage format
    const messages: ChatMessage[] = [];
    for (const interaction of chatInteractions) {
      const details = interaction.details as {
        message?: string;
        response?: string;
      };

      if (details.message) {
        messages.push({
          id: `${interaction.id}-user`,
          role: "user",
          content: details.message,
          timestamp: interaction.timestamp,
        });
      }

      if (details.response) {
        messages.push({
          id: `${interaction.id}-assistant`,
          role: "assistant",
          content: details.response,
          timestamp: interaction.timestamp,
        });
      }
    }

    return messages;
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return [];
  }
}
