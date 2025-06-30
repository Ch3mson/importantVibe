'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface TranscriptInputProps {
  onAnalyze: (transcript: string) => void;
  isLoading: boolean;
}

const TranscriptInput: React.FC<TranscriptInputProps> = ({ onAnalyze, isLoading }) => {
  const [transcript, setTranscript] = React.useState('');

  const handleAnalyzeClick = () => {
    onAnalyze(transcript);
  };

  return (
    <div className="grid w-full gap-4">
      <Textarea
        id="transcript"
        placeholder="Paste your JSON transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="min-h-[300px]"
      />
      <Button onClick={handleAnalyzeClick} disabled={!transcript || isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Transcript'}
      </Button>
    </div>
  );
};

export default TranscriptInput; 