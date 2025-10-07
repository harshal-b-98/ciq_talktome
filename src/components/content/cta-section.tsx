/**
 * CTA Section Component for Agent-powered Content
 * CGL-67: Create reusable content rendering components
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CallToAction, RelatedLink } from "@/lib/agent/types";

interface CtaSectionProps {
  cta?: CallToAction;
  relatedLinks?: RelatedLink[];
  title?: string;
  description?: string;
}

export function CtaSection({ cta, relatedLinks, title, description }: CtaSectionProps) {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-lg mb-8 opacity-90">{description}</p>}
        <div className="flex gap-4 justify-center flex-wrap">
          {cta && (
            <Button asChild size="lg" variant="secondary">
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
          )}
          {relatedLinks?.map((link, idx) => (
            <Button key={idx} asChild size="lg" variant="outline">
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
