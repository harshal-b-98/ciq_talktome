/**
 * Agent Logging Utilities
 * CGL-26: Add logging for Agent decisions and content selections
 */

import type { AgentLog, AgentLogEventType } from "./types";

export class AgentLogger {
  private logs: AgentLog[] = [];

  log(
    sessionId: string,
    route: string,
    eventType: AgentLogEventType,
    details: Record<string, unknown>,
    options: {
      duration?: number;
      success?: boolean;
      error?: string;
    } = {},
  ): void {
    const log: AgentLog = {
      timestamp: new Date(),
      sessionId,
      route,
      eventType,
      details,
      duration: options.duration,
      success: options.success ?? true,
      error: options.error,
    };

    this.logs.push(log);

    // In production, send to monitoring service (Datadog, etc.)
    if (process.env.NODE_ENV === "production") {
      this.sendToMonitoring(log);
    } else {
      // Development: console log
      console.log("[Agent Log]", {
        eventType,
        sessionId,
        route,
        success: log.success,
        duration: log.duration ? `${log.duration}ms` : undefined,
        error: log.error,
        details,
      });
    }
  }

  private sendToMonitoring(log: AgentLog): void {
    // TODO: Integrate with monitoring service (Story CGL-184)
    // Example: datadog.log(log)
  }

  getLogs(sessionId?: string): AgentLog[] {
    if (sessionId) {
      return this.logs.filter((log) => log.sessionId === sessionId);
    }
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}

// Singleton instance
export const agentLogger = new AgentLogger();
