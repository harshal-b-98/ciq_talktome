/**
 * Prompt Composition Utilities
 * CGL-20: Build LLM prompt composition with context injection
 * CGL-21: Create cold-start prompt strategy for first-time visitors
 */

import type { PromptContext } from "./types";

/**
 * Compose the system prompt for the Agent
 */
export function composeSystemPrompt(): string {
  return `You are an AI assistant for ConsumerIQ, a leading provider of AI-powered market intelligence for the consumer goods industry.

Your role is to help visitors understand ConsumerIQ's features and value proposition by providing relevant, personalized content based on their journey through the website.

IMPORTANT GUIDELINES:
1. Only use information from the provided context and sources
2. Always cite your sources when referencing specific features or capabilities
3. Be concise and professional
4. Focus on business value and practical applications
5. Adapt your tone based on the visitor's apparent persona (executive, analyst, etc.)
6. If you don't have information to answer a question, acknowledge it and suggest relevant resources

CONTENT STRUCTURE:
- Provide a clear title that matches the visitor's context
- Write engaging body content (2-4 paragraphs)
- Include relevant call-to-action suggestions
- Suggest related content that might interest the visitor`;
}

/**
 * Compose the user prompt with context
 * CGL-20: Context injection for returning visitors
 */
export function composeUserPrompt(context: PromptContext): string {
  if (context.isFirstVisit) {
    return composeColdStartPrompt(context);
  }

  return composeReturningVisitorPrompt(context);
}

/**
 * Cold-start prompt for first-time visitors
 * CGL-21: Create cold-start prompt strategy
 */
function composeColdStartPrompt(context: PromptContext): string {
  const routeContext = getRouteContext(context.route);

  return `Generate personalized content for a first-time visitor viewing the ${routeContext.name} page.

VISITOR CONTEXT:
- First visit to the site
- Current route: ${context.route}
- No previous interaction history

TASK:
Generate engaging content that:
1. Introduces ConsumerIQ's core value proposition
2. Highlights the most relevant features for ${routeContext.name}
3. Creates interest and encourages exploration
4. Uses ${routeContext.tone} tone

${context.userQuery ? `SPECIFIC QUESTION: ${context.userQuery}\n` : ""}
FORMAT:
Return a JSON object with:
{
  "title": "Clear, engaging title",
  "body": "2-4 paragraphs of content",
  "cta": { "text": "Call to action text", "href": "/relevant-page" },
  "relatedLinks": [{ "title": "Link title", "href": "/path", "description": "Brief description" }]
}`;
}

/**
 * Prompt for returning visitors with session history
 */
function composeReturningVisitorPrompt(context: PromptContext): string {
  const routeContext = getRouteContext(context.route);

  return `Generate personalized content for a returning visitor viewing the ${routeContext.name} page.

VISITOR CONTEXT:
- Returning visitor with interaction history
- Current route: ${context.route}
- Session history: ${context.sessionHistory}
- Persona indicators: ${context.personaInfo}

TASK:
Generate content that:
1. Builds on their previous visits and interests
2. Avoids repeating content they've already seen
3. Provides deeper insights or next steps
4. Personalizes tone and examples based on their persona
5. Uses ${routeContext.tone} tone

${context.userQuery ? `SPECIFIC QUESTION: ${context.userQuery}\n` : ""}
FORMAT:
Return a JSON object with:
{
  "title": "Clear, engaging title",
  "body": "2-4 paragraphs of content",
  "cta": { "text": "Call to action text", "href": "/relevant-page" },
  "relatedLinks": [{ "title": "Link title", "href": "/path", "description": "Brief description" }]
}`;
}

/**
 * Get context-specific information for each route
 */
function getRouteContext(route: string): { name: string; tone: string } {
  const routeMap: Record<
    string,
    { name: string; tone: string }
  > = {
    "/": { name: "Homepage", tone: "welcoming and inspirational" },
    "/features": {
      name: "Features Overview",
      tone: "informative and value-focused",
    },
    "/about": { name: "About Us", tone: "authentic and trustworthy" },
    "/contact": { name: "Contact", tone: "helpful and accessible" },
  };

  // Check for feature detail routes
  if (route.startsWith("/features/")) {
    return {
      name: "Feature Detail",
      tone: "detailed and technical yet accessible",
    };
  }

  return routeMap[route] || { name: "Page", tone: "professional and helpful" };
}

/**
 * Compose grounding instructions for the Agent
 * CGL-23: Add content grounding guardrails (cite sources only)
 */
export function composeGroundingInstructions(): string {
  return `
CONTENT GROUNDING RULES:
1. ONLY use information from the provided sources/context
2. NEVER make up features, capabilities, or statistics
3. ALWAYS cite which source you're referencing
4. If information is not in the sources, say "I don't have that information"
5. Do not hallucinate company details, pricing, or specific metrics
6. Stick to general industry benefits if specific details aren't available

CITATION FORMAT:
When referencing features or capabilities, use natural language like:
- "As highlighted in our Real-Time Analytics feature..."
- "Our product tracking capabilities include..."
- "According to the platform documentation..."`;
}
