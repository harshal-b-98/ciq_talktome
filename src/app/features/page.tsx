/**
 * Features Index Page with Agent Integration
 * CGL-63: Build content fetching logic for features index
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getServerSession, sessionToContext } from "@/lib/server/session";
import { fetchAgentContent, getFallbackContent } from "@/lib/agent/client";
import { Hero } from "@/components/content/hero";
import { CtaSection } from "@/components/content/cta-section";

export const metadata: Metadata = {
  title: "Features - ConsumerIQ",
  description:
    "Explore ConsumerIQ's powerful features: real-time analytics, AI-powered insights, market intelligence, product tracking, custom dashboards, and enterprise security.",
  keywords: [
    "features",
    "real-time analytics",
    "AI insights",
    "market intelligence",
    "product tracking",
    "custom dashboards",
  ],
};

/**
 * CGL-71: Optimize Server Component caching strategy
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const features = [
  {
    slug: "real-time-analytics",
    title: "Real-Time Analytics",
    description:
      "Access up-to-date market trends, consumer behavior insights, and sales performance data in real-time.",
    icon: (
      <svg
        className="h-12 w-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    slug: "ai-powered-insights",
    title: "AI-Powered Insights",
    description:
      "Leverage machine learning algorithms to predict market trends, identify opportunities, and optimize business strategies.",
    icon: (
      <svg
        className="h-12 w-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    slug: "market-intelligence",
    title: "Market Intelligence",
    description:
      "Comprehensive market research and competitive analysis to help you stay ahead of industry trends and consumer preferences.",
    icon: (
      <svg
        className="h-12 w-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
        />
      </svg>
    ),
  },
  {
    slug: "product-tracking",
    title: "Product Tracking",
    description:
      "Track product launches, monitor SKU performance, and analyze product lifecycle data across multiple channels and regions.",
    icon: (
      <svg
        className="h-12 w-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    slug: "custom-dashboards",
    title: "Custom Dashboards",
    description:
      "Build personalized dashboards with drag-and-drop widgets to visualize the metrics that matter most to your business.",
    icon: (
      <svg
        className="h-12 w-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z"
        />
      </svg>
    ),
  },
  {
    slug: "data-security",
    title: "Enterprise Security",
    description:
      "Bank-level encryption, role-based access controls, and compliance with industry standards to protect your sensitive data.",
    icon: (
      <svg
        className="h-12 w-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
];

export default async function FeaturesPage() {
  // Get session for personalization
  const session = await getServerSession();
  const sessionContext = sessionToContext(session);

  // Fetch Agent-powered content
  let agentOutput;
  try {
    agentOutput = await fetchAgentContent("/features", sessionContext);
  } catch (error) {
    console.error("Agent failed, using fallback:", error);
    agentOutput = getFallbackContent("/features");
  }

  const { content } = agentOutput;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Agent-powered Hero */}
      <Hero content={content} />

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {features.map((feature) => (
          <div
            key={feature.slug}
            className="flex flex-col space-y-4 p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground flex-1">{feature.description}</p>
            <Button variant="outline" asChild className="w-full">
              <Link href={`/features/${feature.slug}`}>Learn More</Link>
            </Button>
          </div>
        ))}
      </div>

      {/* Agent-powered CTA Section */}
      <CtaSection
        title="Ready to Get Started?"
        description="Discover how ConsumerIQ can transform your business with AI-powered market intelligence."
        cta={content.cta}
        relatedLinks={content.relatedLinks}
      />
    </div>
  );
}
