import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

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

      {/* Header */}
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {feature.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          {feature.description}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid gap-12 lg:grid-cols-2 mb-16">
        {/* Key Features */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Key Features</h2>
          <ul className="space-y-4">
            {feature.details.map((detail, index) => (
              <li key={index} className="flex gap-3">
                <svg
                  className="h-6 w-6 text-primary flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-lg">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Benefits</h2>
          <ul className="space-y-4">
            {feature.benefits.map((benefit, index) => (
              <li key={index} className="flex gap-3">
                <svg
                  className="h-6 w-6 text-primary flex-shrink-0 mt-0.5"
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
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg border bg-card p-8 md:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Experience {feature.title}?
        </h2>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          See how this feature can transform your business operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Schedule a Demo</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/features">View All Features</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
