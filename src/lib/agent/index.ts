/**
 * Agent Main Function
 * CGL-19: Implement Agent main function (accepts context, returns content data)
 * CGL-25: Implement error handling for LLM API failures
 */

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { AgentInput, AgentOutput, PromptContext } from "./types";
import { AgentError, AgentErrorCode, AgentLogEventType } from "./types";
import { getAgentConfig } from "./config";
import { agentLogger } from "./logger";
import {
  composeSystemPrompt,
  composeUserPrompt,
  composeGroundingInstructions,
} from "./prompts";
import { vectorSearch } from "./vector-store";

/**
 * Main Agent function
 * Accepts context, returns personalized content data
 */
export async function runAgent(input: AgentInput): Promise<AgentOutput> {
  const startTime = Date.now();
  const sessionId = input.sessionContext?.sessionId || "anonymous";

  // Log agent invocation
  agentLogger.log(sessionId, input.route, AgentLogEventType.AGENT_INVOKED, {
    route: input.route,
    hasSessionContext: !!input.sessionContext,
    hasUserQuery: !!input.userQuery,
  });

  try {
    // Step 1: Retrieve relevant content from vector store (CGL-22)
    const searchQuery = input.userQuery || `content for ${input.route}`;
    const searchResults = await vectorSearch({
      query: searchQuery,
      topK: 5,
    });

    agentLogger.log(sessionId, input.route, AgentLogEventType.VECTOR_SEARCH, {
      query: searchQuery,
      resultsCount: searchResults.length,
    });

    // Step 2: Build prompt context (CGL-20, CGL-21)
    const promptContext: PromptContext = {
      route: input.route,
      sessionHistory: input.sessionContext?.visitHistory
        ?.map((v) => `${v.route}: ${v.summary}`)
        .join("; ") || "No previous visits",
      personaInfo: input.sessionContext?.personaConfidence
        ? `${input.sessionContext.personaConfidence.persona} (${input.sessionContext.personaConfidence.confidence})`
        : "Unknown persona",
      userQuery: input.userQuery,
      isFirstVisit: !input.sessionContext?.visitHistory?.length,
    };

    const systemPrompt = composeSystemPrompt();
    const groundingInstructions = composeGroundingInstructions();
    const userPrompt = composeUserPrompt(promptContext);

    // Include retrieved content in the prompt
    const contextWithSources = `${userPrompt}

AVAILABLE SOURCES:
${searchResults.map((r, i) => `[Source ${i + 1}] ${r.metadata.title}: ${r.content}`).join("\n\n")}

${groundingInstructions}`;

    agentLogger.log(sessionId, input.route, AgentLogEventType.PROMPT_COMPOSED, {
      systemPromptLength: systemPrompt.length,
      userPromptLength: contextWithSources.length,
      sourcesCount: searchResults.length,
    });

    // Step 3: Call LLM with error handling (CGL-25)
    const config = getAgentConfig(false);

    agentLogger.log(sessionId, input.route, AgentLogEventType.LLM_REQUEST, {
      model: config.modelName,
      temperature: config.temperature,
    });

    const result = await generateText({
      model: openai(config.modelName),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: contextWithSources },
      ],
      temperature: config.temperature,
    });

    agentLogger.log(sessionId, input.route, AgentLogEventType.LLM_RESPONSE, {
      tokensUsed: result.usage?.totalTokens,
    });

    // Step 4: Parse and validate response
    const contentData = JSON.parse(result.text);

    const output: AgentOutput = {
      content: contentData,
      metadata: {
        sourceCount: searchResults.length,
        generationTime: Date.now() - startTime,
        modelUsed: config.modelName,
        temperature: config.temperature,
      },
      citations: searchResults.map((r) => ({
        source: r.metadata.title,
        sourceType: r.metadata.sourceType as "feature" | "persona" | "general",
        relevance: r.score,
      })),
    };

    agentLogger.log(
      sessionId,
      input.route,
      AgentLogEventType.CONTENT_GENERATED,
      {
        titleLength: output.content.title.length,
        bodyLength: output.content.body.length,
        citationsCount: output.citations.length,
      },
      { duration: Date.now() - startTime },
    );

    return output;
  } catch (error) {
    // CGL-25: Error handling for LLM API failures
    const agentError = new AgentError(
      error instanceof Error ? error.message : "Unknown error",
      AgentErrorCode.LLM_API_FAILURE,
      error instanceof Error ? error : undefined,
    );

    agentLogger.log(
      sessionId,
      input.route,
      AgentLogEventType.ERROR_OCCURRED,
      {
        errorCode: agentError.code,
        errorMessage: agentError.message,
      },
      {
        success: false,
        error: agentError.message,
        duration: Date.now() - startTime,
      },
    );

    throw agentError;
  }
}

// Export all agent utilities
export * from "./types";
export * from "./config";
export * from "./logger";
export * from "./prompts";
export * from "./vector-store";
