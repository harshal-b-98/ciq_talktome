/**
 * Hero Component for Agent-powered Content
 * CGL-67: Create reusable content rendering components
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ContentData } from "@/lib/agent/types";

interface HeroProps {
  content: ContentData;
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {content.body}
        </p>
        {content.cta && (
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={content.cta.href}>{content.cta.text}</Link>
            </Button>
            {content.relatedLinks && content.relatedLinks[0] && (
              <Button asChild variant="outline" size="lg">
                <Link href={content.relatedLinks[0].href}>
                  {content.relatedLinks[0].title}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
