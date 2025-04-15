
import React, { useState } from 'react';
import { FormTranslations } from '../translations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DescriptionStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  initialValue?: string;
  language: string;
}

export const DescriptionStep: React.FC<DescriptionStepProps> = ({
  onNext,
  translation,
  initialValue = '',
  language
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Description is optional, so we can proceed even if it's empty
    onNext(value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-appear space-y-6 animate-fade-in">
      <div className="space-y-3 text-center animate-scale-in">
        <h1 className="text-3xl font-bold text-foreground">
          {translation.descriptionTitle || 'Project Description'}
        </h1>
        <p className="text-base text-foreground font-medium">
          {translation.descriptionSubtitle || 'Tell us more about your project (optional)'}
        </p>
      </div>

      <div className="space-y-4 animate-slide-in">
        <div className="space-y-3">
          <Label htmlFor="description" className="text-lg font-medium">
            {translation.descriptionLabel || 'Description'}
          </Label>
          <Textarea
            id="description"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={translation.descriptionPlaceholder || 'Provide details about your project...'}
            className="min-h-[180px] text-base"
          />
        </div>

        <Button type="submit" className="w-full text-base py-6 hover:scale-[1.02] transition-transform">
          {translation.descriptionButton || 'Continue'}
        </Button>
      </div>
    </form>
  );
};
