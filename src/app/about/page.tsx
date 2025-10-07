import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

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

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          About ConsumerIQ
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Empowering consumer goods brands with AI-powered market intelligence
          and real-time insights.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="rounded-lg border bg-card p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At ConsumerIQ, we believe that every business deserves access to
            world-class market intelligence. Our mission is to democratize data
            analytics and AI-powered insights, enabling consumer goods brands of
            all sizes to make informed decisions, understand their markets
            deeply, and stay ahead of the competition.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Story</h2>
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Founded by industry veterans with decades of experience in consumer
            goods, data analytics, and artificial intelligence, ConsumerIQ was
            born from a simple observation: traditional market research was too
            slow, too expensive, and too disconnected from the rapid pace of
            modern commerce.
          </p>
          <p>
            We set out to build a platform that combines the power of AI with
            real-time data collection, enabling businesses to understand market
            trends as they happen, not weeks or months later. Today, ConsumerIQ
            serves leading brands across the consumer goods industry, processing
            millions of data points daily to deliver actionable insights.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
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
            </div>
            <h3 className="text-xl font-semibold">Innovation First</h3>
            <p className="text-muted-foreground">
              We continuously push the boundaries of what&apos;s possible with
              AI and data analytics to deliver cutting-edge solutions.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Customer Success</h3>
            <p className="text-muted-foreground">
              Your success is our success. We&apos;re committed to providing
              exceptional support and ensuring you get maximum value from our
              platform.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
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
            </div>
            <h3 className="text-xl font-semibold">Data Privacy</h3>
            <p className="text-muted-foreground">
              We treat your data with the utmost care and respect, maintaining
              the highest standards of security and privacy.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Accuracy & Reliability</h3>
            <p className="text-muted-foreground">
              We ensure data quality and system reliability so you can trust the
              insights that drive your business decisions.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Transparency</h3>
            <p className="text-muted-foreground">
              We believe in clear communication, honest pricing, and transparent
              methodologies in everything we do.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Global Perspective</h3>
            <p className="text-muted-foreground">
              We provide insights across markets and regions, helping you
              understand the global consumer landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="rounded-lg border bg-card p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold">Our Team</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ConsumerIQ is built by a diverse team of data scientists, engineers,
            product specialists, and industry experts who are passionate about
            transforming how businesses understand their markets. With
            backgrounds spanning consumer goods, technology, and analytics, our
            team brings together deep domain expertise and technical excellence
            to solve the most challenging problems in market intelligence.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="rounded-lg border bg-card p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join Us on This Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Whether you&apos;re a global brand or a growing business, we&apos;re
            here to help you succeed with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Explore Our Platform</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
