# Technology Decisions - CIQ Talk 2 Me Marketing Website

**Last Updated:** October 7, 2025
**Project:** CGL - Talk 2 Me Marketing Website

---

## CGL-17: LLM Provider and Orchestration Framework

**Decision Date:** October 7, 2025
**Status:** ✅ DECIDED

### LLM Provider: OpenAI

**Selected:** OpenAI GPT-4
**Reasoning:**
- Industry-standard LLM with proven performance
- Excellent function calling support for structured outputs
- Strong content generation capabilities
- Extensive documentation and community support
- Reliable API with good uptime

**Alternatives Considered:**
- Anthropic Claude: Excellent for long-form content, but OpenAI has better ecosystem
- Cohere: Good for embeddings, less mature for generation

### Orchestration Framework: Vercel AI SDK

**Selected:** Vercel AI SDK (@ai-sdk/openai)
**Reasoning:**
- Native integration with Next.js and Vercel deployment
- Type-safe API with TypeScript support
- Built-in streaming support for real-time responses
- Simplified error handling and retries
- Active development and maintenance
- Supports multiple providers (easy to switch if needed)

**Alternatives Considered:**
- LangChain: More features but adds complexity, overkill for our use case
- Custom implementation: More control but requires more maintenance

### Dependencies Installed

```json
{
  "ai": "^3.x",
  "openai": "^4.x",
  "@ai-sdk/openai": "^1.x"
}
```

### Environment Variables Required

```env
OPENAI_API_KEY=sk-...
```

### Configuration

- Model: `gpt-4-turbo-preview` (or `gpt-4` for production)
- Temperature: 0.7 (default, adjustable for determinism)
- Max Tokens: 2000 (configurable per use case)

---

## Future Technology Decisions

### Vector Database (Story CGL-30)
- TBD: Pinecone, Weaviate, or Supabase pgvector
- Requirement: Semantic search for content retrieval

### Session Store (Story CGL-45)
- TBD: Redis, Vercel KV, or PostgreSQL
- Requirement: Fast session read/write with expiration

### Monitoring & Analytics (Story CGL-184)
- TBD: Vercel Analytics, Datadog, or custom solution
- Requirement: User behavior tracking, performance metrics

### Rate Limiting (Story CGL-197)
- TBD: Vercel Rate Limit, Upstash, or custom middleware
- Requirement: Per-session and per-IP rate limiting
