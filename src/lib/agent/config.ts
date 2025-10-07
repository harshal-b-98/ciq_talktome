/**
 * Agent Configuration
 * CGL-24: Build determinism controls (temperature, seed management)
 */

import type { AgentConfig } from "./types";

export const DEFAULT_AGENT_CONFIG: AgentConfig = {
  modelName: "gpt-4-turbo-preview",
  temperature: 0.7,
  maxTokens: 2000,
  enableLogging: true,
  enableCitations: true,
};

export const DETERMINISTIC_AGENT_CONFIG: AgentConfig = {
  modelName: "gpt-4-turbo-preview",
  temperature: 0.2, // Lower temperature for more consistent outputs
  maxTokens: 2000,
  seed: 42, // Fixed seed for reproducibility
  topP: 0.9,
  enableLogging: true,
  enableCitations: true,
};

export function getAgentConfig(deterministic: boolean = false): AgentConfig {
  return deterministic ? DETERMINISTIC_AGENT_CONFIG : DEFAULT_AGENT_CONFIG;
}
