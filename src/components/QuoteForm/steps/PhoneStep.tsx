
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormTranslations } from '../translations';

interface PhoneStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  initialValue?: string;
  language: string;
  defaultCountry?: string;
}

export const PhoneStep: React.FC<PhoneStepProps> = ({
  onNext,
  translation,
  initialValue = '',
  language,
  defaultCountry = 'DZ'
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      setError(translation.phoneError);
      return;
    }

    try {
      if (!isValidPhoneNumber(value)) {
        setError(translation.phoneError);
        return;
      }
      setError(null);
      onNext(value);
    } catch (error) {
      setError(translation.phoneError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-appear space-y-6 animate-fade-in">
      <div className="space-y-2 text-center animate-scale-in">
        <h1 className="text-2xl font-bold">{translation.phoneTitle}</h1>
      </div>

      <div className="space-y-4">
        <div className="space-y-2 animate-slide-in">
          <Label htmlFor="phone">{translation.phoneTitle}</Label>
          <style>
            {`
              .PhoneInput {
                display: flex;
                align-items: center;
              }
              .PhoneInputCountry {
                margin-right: 0.5rem;
              }
              .PhoneInputInput {
                flex: 1;
                min-width: 0;
                border-radius: 0.375rem;
                border-width: 1px;
                padding: 0.5rem 0.75rem;
                background-color: transparent;
                color: inherit;
              }
              .dark .PhoneInputInput {
                border-color: hsl(var(--border));
                background-color: transparent;
                color: inherit;
              }
            `}
          </style>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry={defaultCountry}
            value={value}
            onChange={setValue as any}
            placeholder={translation.phonePlaceholder}
            className="flex"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button type="submit" className="w-full hover:scale-[1.02] transition-transform">
          {translation.phoneButton}
        </Button>
      </div>
    </form>
  );
};
