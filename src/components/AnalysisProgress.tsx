'use client';

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface AnalysisProgressProps {
  isAnalyzing: boolean;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ isAnalyzing }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const steps = [
    'Parsing transcript...',
    'Analyzing dialogue patterns...',
    'Identifying key entities...',
    'Evaluating candidate responses...',
    'Generating insights...',
    'Finalizing analysis...'
  ];

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStep('');
      return;
    }

    let currentStepIndex = 0;
    setCurrentStep(steps[0]);
    setProgress(5);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return prev;
        }
        
        const increment = Math.random() * 15 + 5; // Random increment between 5-20
        const newProgress = Math.min(prev + increment, 95);
        
        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 95) * (steps.length - 1));
        if (stepIndex !== currentStepIndex && stepIndex < steps.length) {
          currentStepIndex = stepIndex;
          setCurrentStep(steps[stepIndex]);
        }
        
        return newProgress;
      });
    }, 800 + Math.random() * 400); // Random interval between 800-1200ms

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  if (!isAnalyzing) return null;

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">Analyzing Transcript</h3>
        <p className="text-sm text-gray-600 mt-1">{currentStep}</p>
      </div>
      
      <div className="space-y-2">
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default AnalysisProgress;