
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormTranslations } from '../translations';

interface BusinessStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  initialValue?: string;
  language: string;
  isOptional?: boolean;
}

export const BusinessStep: React.FC<BusinessStepProps> = ({
  onNext,
  translation,
  initialValue = '',
  language,
  isOptional = false
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value.trim() && !isOptional) {
      setError(translation.businessError);
      return;
    }
    
    setError(null);
    onNext(value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-appear space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">{translation.businessTitle}</h1>
        {isOptional && (
          <p className="text-sm text-muted-foreground">{translation.optional || "(Optional)"}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business">{translation.businessTitle}</Label>
          <Input
            id="business"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={translation.businessPlaceholder}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button type="submit" className="w-full">
          {translation.businessButton}
        </Button>
      </div>
    </form>
  );
};
