/**
 * Vector Store Mock Implementation
 * CGL-22: Implement content retrieval from vector database
 *
 * This is a mock implementation until we integrate a real vector database
 * in Story CGL-30 (Vector Database for Content Storage and Retrieval)
 */

import type {
  VectorSearchQuery,
  VectorSearchResult,
  VectorMetadata,
} from "./types";

// Mock content database
const MOCK_CONTENT_DB: Array<{ id: string; content: string; metadata: VectorMetadata }> = [
  {
    id: "real-time-analytics-1",
    content: "ConsumerIQ provides real-time analytics that give you up-to-the-minute insights into market trends, consumer behavior, and sales performance. Make faster, smarter decisions with live data updates from multiple sources.",
    metadata: {
      title: "Real-Time Analytics Overview",
      slug: "real-time-analytics",
      tags: ["analytics", "real-time", "data"],
      persona: ["brand_manager", "data_analyst", "executive"],
      feature: ["real-time-analytics"],
      sourceType: "feature",
      lastUpdated: new Date(),
    },
  },
  {
    id: "ai-insights-1",
    content: "Leverage cutting-edge machine learning algorithms to predict market trends, identify opportunities, and optimize your business strategies. Our AI-powered insights provide predictive analytics for demand forecasting with 95% accuracy.",
    metadata: {
      title: "AI-Powered Insights",
      slug: "ai-powered-insights",
      tags: ["ai", "machine-learning", "predictions"],
      persona: ["data_analyst", "executive"],
      feature: ["ai-powered-insights"],
      sourceType: "feature",
      lastUpdated: new Date(),
    },
  },
  {
    id: "market-intelligence-1",
    content: "Stay ahead with comprehensive market research, competitive analysis, and consumer trend tracking across all channels and regions. Track your competitive position and identify white space opportunities.",
    metadata: {
      title: "Market Intelligence",
      slug: "market-intelligence",
      tags: ["market-research", "competitive-analysis", "trends"],
      persona: ["brand_manager", "executive", "researcher"],
      feature: ["market-intelligence"],
      sourceType: "feature",
      lastUpdated: new Date(),
    },
  },
  {
    id: "product-tracking-1",
    content: "Monitor product launches, track SKU performance, and analyze the complete product lifecycle across multiple channels and regions. Optimize inventory and identify underperforming SKUs early.",
    metadata: {
      title: "Product Tracking",
      slug: "product-tracking",
      tags: ["products", "sku", "inventory", "lifecycle"],
      persona: ["brand_manager", "data_analyst"],
      feature: ["product-tracking"],
      sourceType: "feature",
      lastUpdated: new Date(),
    },
  },
  {
    id: "custom-dashboards-1",
    content: "Build personalized dashboards with drag-and-drop widgets to visualize exactly the metrics that matter most to your business. Choose from 100+ pre-built visualization widgets with no technical skills required.",
    metadata: {
      title: "Custom Dashboards",
      slug: "custom-dashboards",
      tags: ["dashboards", "visualization", "customization"],
      persona: ["brand_manager", "data_analyst"],
      feature: ["custom-dashboards"],
      sourceType: "feature",
      lastUpdated: new Date(),
    },
  },
  {
    id: "security-1",
    content: "Protect your sensitive business data with bank-level 256-bit AES encryption at rest and in transit, granular role-based access control, and compliance with SOC 2 Type II, GDPR, and CCPA standards. Enterprise-grade security with 99.9% uptime SLA.",
    metadata: {
      title: "Enterprise Security",
      slug: "data-security",
      tags: ["security", "compliance", "encryption"],
      persona: ["executive", "data_analyst"],
      feature: ["data-security"],
      sourceType: "feature",
      lastUpdated: new Date(),
    },
  },
  {
    id: "company-mission-1",
    content: "ConsumerIQ's mission is to democratize data analytics and AI-powered insights, enabling consumer goods brands of all sizes to make informed decisions, understand their markets deeply, and stay ahead of the competition.",
    metadata: {
      title: "Company Mission",
      tags: ["company", "mission", "about"],
      persona: ["brand_manager", "executive", "researcher"],
      sourceType: "general",
      lastUpdated: new Date(),
    },
  },
  {
    id: "company-values-1",
    content: "ConsumerIQ is built on core values: Innovation First, Customer Success, Data Privacy, Accuracy & Reliability, Transparency, and Global Perspective. We continuously push boundaries while maintaining the highest standards of security and privacy.",
    metadata: {
      title: "Company Values",
      tags: ["company", "values", "about"],
      persona: ["brand_manager", "executive", "researcher"],
      sourceType: "general",
      lastUpdated: new Date(),
    },
  },
];

/**
 * Mock vector search implementation
 * Returns relevant content based on simple keyword matching
 *
 * TODO: Replace with real vector database in Story CGL-30
 */
export async function vectorSearch(
  query: VectorSearchQuery,
): Promise<VectorSearchResult[]> {
  const { query: searchQuery, topK = 5, filter } = query;

  // Simple keyword-based matching (mock)
  const results: VectorSearchResult[] = MOCK_CONTENT_DB.map((item) => {
    let score = 0;

    // Calculate mock relevance score based on keyword matching
    const queryLower = searchQuery.toLowerCase();
    const contentLower = item.content.toLowerCase();
    const titleLower = item.metadata.title.toLowerCase();

    // Title match = higher score
    if (titleLower.includes(queryLower)) {
      score += 0.5;
    }

    // Content match = medium score
    if (contentLower.includes(queryLower)) {
      score += 0.3;
    }

    // Tag match = lower score
    item.metadata.tags?.forEach((tag) => {
      if (queryLower.includes(tag.toLowerCase())) {
        score += 0.1;
      }
    });

    return {
      id: item.id,
      content: item.content,
      metadata: item.metadata,
      score,
    };
  })
    .filter((result) => {
      // Apply filters
      if (filter?.persona && result.metadata.persona) {
        if (
          !result.metadata.persona.some((p) => filter.persona?.includes(p))
        ) {
          return false;
        }
      }

      if (filter?.feature && result.metadata.feature) {
        if (
          !result.metadata.feature.some((f) => filter.feature?.includes(f))
        ) {
          return false;
        }
      }

      if (filter?.sourceType && !filter.sourceType.includes(result.metadata.sourceType)) {
        return false;
      }

      // Only include results with some relevance
      return result.score > 0;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return results;
}

/**
 * Get all content for a specific feature slug
 */
export async function getFeatureContent(
  featureSlug: string,
): Promise<VectorSearchResult[]> {
  return MOCK_CONTENT_DB.filter(
    (item) => item.metadata.slug === featureSlug ||
              item.metadata.feature?.includes(featureSlug)
  ).map((item) => ({
    id: item.id,
    content: item.content,
    metadata: item.metadata,
    score: 1.0,
  }));
}
