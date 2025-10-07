/**
 * Agent Client Utility for Server Components
 * CGL-60: Create Agent client utility for Server Components
 *
 * This module provides a high-level interface for Server Components
 * to interact with the Agent system.
 */

import { runAgent } from "./index";
import type { AgentInput, AgentOutput, SessionContext } from "./types";

/**
 * Fetch personalized content for a route using the Agent
 *
 * @param route - The current route/page
 * @param sessionContext - Optional session context for personalization
 * @param userQuery - Optional user query for specific content requests
 * @returns Agent output with personalized content
 */
export async function fetchAgentContent(
  route: string,
  sessionContext?: SessionContext,
  userQuery?: string
): Promise<AgentOutput> {
  const input: AgentInput = {
    route,
    sessionContext,
    userQuery,
  };

  return await runAgent(input);
}

/**
 * Fetch content for homepage with session context
 */
export async function fetchHomeContent(
  sessionContext?: SessionContext
): Promise<AgentOutput> {
  return fetchAgentContent("/", sessionContext);
}

/**
 * Fetch content for features index page
 */
export async function fetchFeaturesContent(
  sessionContext?: SessionContext
): Promise<AgentOutput> {
  return fetchAgentContent("/features", sessionContext);
}

/**
 * Fetch content for a specific feature detail page
 */
export async function fetchFeatureDetailContent(
  slug: string,
  sessionContext?: SessionContext
): Promise<AgentOutput> {
  return fetchAgentContent(`/features/${slug}`, sessionContext);
}

/**
 * Fetch content for about page
 */
export async function fetchAboutContent(
  sessionContext?: SessionContext
): Promise<AgentOutput> {
  return fetchAgentContent("/about", sessionContext);
}

/**
 * Fetch content for contact page
 */
export async function fetchContactContent(
  sessionContext?: SessionContext
): Promise<AgentOutput> {
  return fetchAgentContent("/contact", sessionContext);
}

/**
 * Get fallback content when Agent fails
 * Returns static default content structure
 */
export function getFallbackContent(route: string): AgentOutput {
  return {
    content: {
      title: "Welcome to ConsumerIQ",
      body: "Discover AI-powered market intelligence and consumer insights.",
      cta: {
        text: "Get Started",
        href: "/contact",
      },
    },
    metadata: {
      sourceCount: 0,
      generationTime: 0,
      modelUsed: "fallback",
      temperature: 0,
    },
    citations: [],
  };
}
