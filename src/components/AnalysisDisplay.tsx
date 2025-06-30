'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface AnalysisSection {
  timeline: string;
  section: string;
  summary: string;
  highlights: string[];
  lowlights: string[];
  keyNamedEntities: string[];
}

interface AnalysisDisplayProps {
  analysis: AnalysisSection | null;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">{analysis.section} ({analysis.timeline})</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <section>
          <h3 className="font-semibold text-lg mb-2">Summary</h3>
          <p className="text-muted-foreground">{analysis.summary}</p>
        </section>
        
        <section>
          <h3 className="font-semibold text-lg mb-2">Highlights</h3>
          <ul className="list-disc list-inside space-y-1">
            {analysis.highlights.map((highlight, index) => (
              <li key={index} className="text-success">{highlight}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">Lowlights</h3>
          <ul className="list-disc list-inside space-y-1">
            {analysis.lowlights.map((lowlight, index) => (
              <li key={index} className="text-destructive">{lowlight}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">Key Named Entities</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.keyNamedEntities.map((entity, index) => (
              <Badge key={index} variant="secondary">{entity}</Badge>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default AnalysisDisplay; 