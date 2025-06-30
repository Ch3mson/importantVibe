'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
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
      <Label htmlFor="transcript" className="text-lg">
        Paste your interview transcript (JSON)
      </Label>
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