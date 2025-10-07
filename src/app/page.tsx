/**
 * Homepage with Agent Integration
 * CGL-62: Build content fetching logic for homepage
 */

import type { Metadata } from "next";
import { Hero } from "@/components/content/hero";
import { FeatureGrid } from "@/components/content/feature-grid";
import { CtaSection } from "@/components/content/cta-section";
import { getServerSession, sessionToContext } from "@/lib/server/session";
import { fetchHomeContent, getFallbackContent } from "@/lib/agent/client";

/**
 * Generate dynamic metadata from Agent content
 * CGL-70: Add metadata generation from Agent content
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const session = await getServerSession();
    const sessionContext = sessionToContext(session);
    const agentOutput = await fetchHomeContent(sessionContext);

    return {
      title: agentOutput.content.title || "ConsumerIQ - AI-Powered Market Intelligence",
      description: agentOutput.content.body || "AI-powered insights for the consumer goods industry.",
      keywords: [
        "consumer intelligence",
        "market analytics",
        "AI insights",
        "consumer goods",
        "real-time analytics",
      ],
    };
  } catch (error) {
    console.error("Failed to generate metadata from Agent:", error);
    return {
      title: "ConsumerIQ - AI-Powered Market Intelligence",
      description: "AI-powered insights for the consumer goods industry.",
      keywords: ["consumer intelligence", "market analytics"],
    };
  }
}

/**
 * CGL-71: Optimize Server Component caching strategy
 * - Force dynamic rendering for personalization
 * - Cache Agent responses per session where possible
 */
export const dynamic = "force-dynamic"; // Ensure personalization works
export const revalidate = 0; // Don't cache at build time

export default async function Home() {
  // Get session for personalization
  const session = await getServerSession();
  const sessionContext = sessionToContext(session);

  // Fetch Agent-powered content
  let agentOutput;
  try {
    agentOutput = await fetchHomeContent(sessionContext);
  } catch (error) {
    console.error("Agent failed, using fallback:", error);
    agentOutput = getFallbackContent("/");
  }

  const { content } = agentOutput;

  return (
    <div>
      <Hero content={content} />

      <FeatureGrid
        sections={content.sections}
        title="Why Choose ConsumerIQ?"
        description="Leverage AI-driven analytics to stay ahead in the competitive consumer goods market."
      />

      <CtaSection
        title="Ready to Transform Your Business?"
        description="Join leading brands who trust ConsumerIQ for their market intelligence needs."
        cta={content.cta}
        relatedLinks={content.relatedLinks}
      />
    </div>
  );
}
