/**
 * Feature Grid Component for Agent-powered Content
 * CGL-67: Create reusable content rendering components
 */

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ContentSection } from "@/lib/agent/types";

interface FeatureGridProps {
  sections?: ContentSection[];
  title?: string;
  description?: string;
}

export function FeatureGrid({ sections, title, description }: FeatureGridProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card key={section.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
