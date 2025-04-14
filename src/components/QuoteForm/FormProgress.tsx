
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  currentStep: string;
  totalSteps: number;
  progress: number;
  language: string;
}

const getStepTranslation = (language: string) => {
  switch (language) {
    case 'fr':
      return 'Étape';
    case 'ar':
      return 'خطوة';
    default:
      return 'Step';
  }
};

export const FormProgress: React.FC<FormProgressProps> = ({ 
  currentStep, 
  totalSteps, 
  progress,
  language 
}) => {
  const stepText = getStepTranslation(language);

  return (
    <div className="progress-container text-sm flex flex-col gap-1 min-w-[120px]">
      <div className="flex justify-between items-center w-full">
        <span className="text-muted-foreground">
          {stepText} {currentStep}/{totalSteps}
        </span>
        <span className="font-semibold">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
