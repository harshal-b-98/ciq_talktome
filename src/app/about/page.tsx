/**
 * About Page with Agent Integration
 * CGL-65: Build content fetching logic for about page
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getServerSession, sessionToContext } from "@/lib/server/session";
import { fetchAgentContent, getFallbackContent } from "@/lib/agent/client";
import { Hero } from "@/components/content/hero";
import { ContentSections } from "@/components/content/content-sections";
import { CtaSection } from "@/components/content/cta-section";

export const metadata: Metadata = {
  title: "About Us - ConsumerIQ",
  description:
    "Learn about ConsumerIQ's mission to democratize data analytics and AI-powered insights for consumer goods brands of all sizes.",
  keywords: [
    "about ConsumerIQ",
    "company mission",
    "consumer intelligence",
    "market research",
  ],
};

/**
 * CGL-71: Optimize Server Component caching strategy
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  // Get session for personalization
  const session = await getServerSession();
  const sessionContext = sessionToContext(session);

  // Fetch Agent-powered content
  let agentOutput;
  try {
    agentOutput = await fetchAgentContent("/about", sessionContext);
  } catch (error) {
    console.error("Agent failed, using fallback:", error);
    agentOutput = getFallbackContent("/about");
  }

  const { content } = agentOutput;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Agent-powered Hero */}
      <Hero content={content} />

      {/* Agent-powered Content Sections */}
      <ContentSections sections={content.sections} layout="single" />

      {/* Agent-powered CTA Section */}
      <CtaSection
        title="Join Us on This Journey"
        description="Whether you're a global brand or a growing business, we're here to help you succeed with data-driven insights."
        cta={content.cta}
        relatedLinks={content.relatedLinks}
      />
    </div>
  );
}
