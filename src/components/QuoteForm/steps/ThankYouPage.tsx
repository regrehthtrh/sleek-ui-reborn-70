
import React, { useEffect } from 'react';
import { FormTranslations } from '../translations';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThankYouPageProps {
  onRestart: () => void;
  translation: FormTranslations;
  language: string;
  selectedServices: string[];
  totalBudget: number;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  onRestart,
  translation,
  language,
  selectedServices,
  totalBudget
}) => {
  // Auto-scroll to top when thank you page is shown
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8 text-center form-appear">
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-primary/20 p-3">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          {translation.thankYouTitle || "Thank You!"}
        </h2>
        <p className="text-muted-foreground">
          {translation.thankYouMessage || "Your request has been submitted successfully. We'll get back to you shortly."}
        </p>
      </div>

      {selectedServices.length > 0 && (
        <div className="space-y-4 bg-secondary/30 rounded-lg p-6 text-left">
          <h3 className="font-semibold text-xl text-center">
            {translation.servicesRequestedTitle || "Services Requested"}
          </h3>
          <ul className="space-y-2">
            {selectedServices.map((service, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                {service}
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-4 mt-4">
            <p className="font-semibold text-right">
              {translation.totalBudgetLabel || "Total Budget"}: {totalBudget.toLocaleString()} DA
            </p>
          </div>
        </div>
      )}

      <Button onClick={onRestart} className="mt-8">
        {translation.startNewRequest || "Start New Request"}
      </Button>
    </div>
  );
};
