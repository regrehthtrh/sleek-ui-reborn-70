
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
    <form onSubmit={handleSubmit} className="form-appear space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">{translation.descriptionTitle || "Project Description"}</h1>
        <p className="text-muted-foreground">{translation.descriptionSubtitle || "Please provide a brief description of your project requirements."}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">{translation.descriptionLabel || "Project Details (optional)"}</Label>
          <Textarea
            id="description"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={translation.descriptionPlaceholder || "Tell us more about your project requirements..."}
            className="min-h-[150px]"
          />
        </div>

        <Button type="submit" className="w-full">
          {translation.descriptionButton || "Next"}
        </Button>
      </div>
    </form>
  );
};
