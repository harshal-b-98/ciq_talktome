/**
 * Content Sections Component for Agent-powered Content
 * CGL-67: Create reusable content rendering components
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ContentSection } from "@/lib/agent/types";

interface ContentSectionsProps {
  sections?: ContentSection[];
  layout?: "single" | "two-column" | "grid";
}

export function ContentSections({ sections, layout = "single" }: ContentSectionsProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  const gridClass =
    layout === "two-column" ? "md:grid-cols-2" :
    layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" :
    "";

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className={`grid gap-8 ${gridClass}`}>
          {sections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {section.body.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
