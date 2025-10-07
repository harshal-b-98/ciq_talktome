import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ConsumerIQ - AI-Powered Market Intelligence",
  description:
    "AI-powered insights for the consumer goods industry. Make smarter decisions with real-time market intelligence and predictive analytics.",
  keywords: [
    "consumer intelligence",
    "market analytics",
    "AI insights",
    "consumer goods",
    "real-time analytics",
  ],
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 py-12 md:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to ConsumerIQ
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] sm:text-2xl">
          AI-powered insights for the consumer goods industry. Make smarter
          decisions with real-time market intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/features">Explore Features</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-12 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose ConsumerIQ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Leverage AI-driven analytics to stay ahead in the competitive
            consumer goods market.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Real-Time Analytics</h3>
            <p className="text-muted-foreground">
              Access up-to-date market trends and consumer behavior insights.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card">
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
            <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Leverage machine learning to predict trends and optimize
              strategies.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card">
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
            <h3 className="text-xl font-semibold">Secure & Reliable</h3>
            <p className="text-muted-foreground">
              Enterprise-grade security with 99.9% uptime guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="rounded-lg border bg-card p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Join leading brands who trust ConsumerIQ for their market
            intelligence needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
