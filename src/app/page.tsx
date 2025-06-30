'use client';

import React, { useState } from 'react';
import TranscriptInput from "@/components/TranscriptInput";
import AnalysisPagination from "@/components/AnalysisPagination";
import AnalysisDisplay from "@/components/AnalysisDisplay";
import AnalysisProgress from "@/components/AnalysisProgress";
import type { AnalysisSection } from "@/components/AnalysisDisplay";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisSection[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (transcript: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze transcript');
      }

      const data = await response.json();
      setAnalysis(data);
      setCurrentPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const currentAnalysisSection = analysis ? analysis[currentPage - 1] : null;

  return (
    <section className="w-full flex flex-col items-center gap-8">
      <TranscriptInput onAnalyze={handleAnalyze} isLoading={isLoading} />

      <AnalysisProgress isAnalyzing={isLoading} />
      {error && <p className="text-red-500">{error}</p>}
      
      {analysis && currentAnalysisSection && (
        <>
          <AnalysisDisplay analysis={currentAnalysisSection} />
          <div className="w-full max-w-4xl">
            <AnalysisPagination
              currentPage={currentPage}
              totalPages={analysis.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </section>
  );
}
