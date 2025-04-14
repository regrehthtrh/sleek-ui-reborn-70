
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormTranslations } from '../translations';
import { ArrowRight, Building2 } from 'lucide-react';

interface BusinessStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  initialValue: string;
  language: string;
}

export const BusinessStep: React.FC<BusinessStepProps> = ({ 
  onNext, 
  translation, 
  initialValue,
  language
}) => {
  const [business, setBusiness] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!business.trim()) {
      setError(translation.businessError);
      return;
    }
    onNext(business);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.businessTitle}</h2>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
          <Input
            type="text"
            id="business"
            value={business}
            onChange={(e) => {
              setBusiness(e.target.value);
              if (e.target.value.trim()) setError('');
            }}
            placeholder={translation.businessPlaceholder}
            className={`h-12 text-lg pl-12 ${error ? 'border-red-500' : ''}`}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.businessButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
