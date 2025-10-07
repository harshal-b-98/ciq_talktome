/**
 * Feature Detail Page with Agent Integration
 * CGL-64: Build content fetching logic for feature detail pages
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getServerSession, sessionToContext } from "@/lib/server/session";
import { fetchAgentContent, getFallbackContent } from "@/lib/agent/client";
import { Hero } from "@/components/content/hero";
import { ContentSections } from "@/components/content/content-sections";
import { CtaSection } from "@/components/content/cta-section";

const featuresData = {
  "real-time-analytics": {
    title: "Real-Time Analytics",
    description:
      "Make faster, smarter decisions with up-to-the-minute insights into market trends, consumer behavior, and sales performance.",
    details: [
      "Live data updates from multiple sources",
      "Interactive dashboards with customizable widgets",
      "Real-time alerts for critical market changes",
      "Historical trend analysis and forecasting",
      "Mobile-optimized for on-the-go access",
    ],
    benefits: [
      "Respond to market changes within minutes, not days",
      "Identify emerging trends before your competitors",
      "Make data-driven decisions with confidence",
      "Reduce time spent on manual data collection",
    ],
  },
  "ai-powered-insights": {
    title: "AI-Powered Insights",
    description:
      "Leverage cutting-edge machine learning algorithms to predict market trends, identify opportunities, and optimize your business strategies.",
    details: [
      "Predictive analytics for demand forecasting",
      "Automated anomaly detection in sales patterns",
      "Natural language queries for instant insights",
      "Recommendation engine for product optimization",
      "Sentiment analysis from consumer feedback",
    ],
    benefits: [
      "Predict future trends with 95% accuracy",
      "Discover hidden patterns in complex data",
      "Automate routine analysis tasks",
      "Get actionable recommendations, not just data",
    ],
  },
  "market-intelligence": {
    title: "Market Intelligence",
    description:
      "Stay ahead with comprehensive market research, competitive analysis, and consumer trend tracking across all channels and regions.",
    details: [
      "Competitive landscape monitoring",
      "Consumer sentiment tracking",
      "Regional market trend analysis",
      "Category performance insights",
      "Share of voice and brand awareness metrics",
    ],
    benefits: [
      "Understand your competitive position",
      "Identify white space opportunities",
      "Track brand perception in real-time",
      "Make informed expansion decisions",
    ],
  },
  "product-tracking": {
    title: "Product Tracking",
    description:
      "Monitor product launches, track SKU performance, and analyze the complete product lifecycle across multiple channels and regions.",
    details: [
      "New product launch monitoring",
      "SKU-level performance tracking",
      "Distribution channel analysis",
      "Inventory optimization insights",
      "Product lifecycle management",
    ],
    benefits: [
      "Track every product from launch to retirement",
      "Optimize inventory across channels",
      "Identify underperforming SKUs early",
      "Maximize product profitability",
    ],
  },
  "custom-dashboards": {
    title: "Custom Dashboards",
    description:
      "Build personalized dashboards with drag-and-drop widgets to visualize exactly the metrics that matter most to your business.",
    details: [
      "Drag-and-drop dashboard builder",
      "100+ pre-built visualization widgets",
      "Custom KPI creation",
      "Role-based dashboard templates",
      "Export and sharing capabilities",
    ],
    benefits: [
      "Focus on metrics that drive your business",
      "Share insights across your organization",
      "No technical skills required",
      "Update dashboards in real-time",
    ],
  },
  "data-security": {
    title: "Enterprise Security",
    description:
      "Protect your sensitive business data with bank-level encryption, granular access controls, and compliance with industry standards.",
    details: [
      "256-bit AES encryption at rest and in transit",
      "Role-based access control (RBAC)",
      "Single sign-on (SSO) integration",
      "SOC 2 Type II certified",
      "GDPR and CCPA compliant",
    ],
    benefits: [
      "Sleep easy with enterprise-grade security",
      "Control who sees what with granular permissions",
      "Meet compliance requirements automatically",
      "99.9% uptime SLA guarantee",
    ],
  },
};

/**
 * CGL-71: Optimize Server Component caching strategy
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  return Object.keys(featuresData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = featuresData[slug as keyof typeof featuresData];

  if (!feature) {
    return {
      title: "Feature Not Found - ConsumerIQ",
    };
  }

  return {
    title: `${feature.title} - ConsumerIQ`,
    description: feature.description,
    keywords: [feature.title, "ConsumerIQ", "consumer intelligence", "analytics"],
  };
}

interface FeaturePageProps {
  params: Promise<{ slug: string }>;
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = featuresData[slug as keyof typeof featuresData];

  if (!feature) {
    notFound();
  }

  // Get session for personalization (middleware handles creation/updates)
  const session = await getServerSession(true);
  const sessionContext = sessionToContext(session);

  // Fetch Agent-powered content for this feature
  let agentOutput;
  try {
    agentOutput = await fetchAgentContent(`/features/${slug}`, sessionContext);
  } catch (error) {
    console.error("Agent failed, using fallback:", error);
    agentOutput = getFallbackContent(`/features/${slug}`);
  }

  const { content } = agentOutput;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/features" className="hover:text-foreground">
            Features
          </Link>
          <span>/</span>
          <span className="text-foreground">{feature.title}</span>
        </div>
      </div>

      {/* Agent-powered Hero */}
      <Hero content={content} />

      {/* Agent-powered Content Sections */}
      <ContentSections sections={content.sections} layout="two-column" />

      {/* Agent-powered CTA Section */}
      <CtaSection
        title={`Ready to Experience ${feature.title}?`}
        description="See how this feature can transform your business operations."
        cta={content.cta}
        relatedLinks={content.relatedLinks}
      />
    </div>
  );
}
