
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormTranslations } from '../translations';
import { ArrowRight, DollarSign } from 'lucide-react';

interface BudgetStepProps {
  onNext: (value: number) => void;
  translation: FormTranslations;
  language: string;
}

export const BudgetStep: React.FC<BudgetStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetValue = parseFloat(budget);
    
    if (isNaN(budgetValue) || budgetValue < 3) {
      setError(translation.budgetError);
      return;
    }
    
    onNext(budgetValue);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.budgetTitle}</h2>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
          <Input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 3) {
                setError('');
              }
            }}
            placeholder={translation.budgetPlaceholder}
            className={`h-12 text-lg pl-12 ${error ? 'border-red-500' : ''}`}
            min="3"
            step="0.1"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.budgetButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
