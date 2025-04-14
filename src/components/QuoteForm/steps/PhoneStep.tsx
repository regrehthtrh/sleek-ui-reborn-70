
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormTranslations } from '../translations';
import { ArrowRight } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface PhoneStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  initialValue: string;
  language: string;
}

export const PhoneStep: React.FC<PhoneStepProps> = ({ 
  onNext, 
  translation, 
  initialValue,
  language
}) => {
  const [phone, setPhone] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError(translation.phoneError);
      return;
    }
    onNext(phone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.phoneTitle}</h2>
      </div>
      
      <div className="space-y-2">
        <div className="phone-input-container">
          <PhoneInput
            international
            defaultCountry="DZ"
            value={phone}
            onChange={(value) => {
              setPhone(value || '');
              if (value) setError('');
            }}
            placeholder={translation.phonePlaceholder}
            className={`${error ? 'phone-input-error' : ''}`}
          />
          <style jsx global>{`
            .PhoneInput {
              display: flex;
              align-items: center;
              border-radius: 0.375rem;
              border: 1px solid ${error ? '#ef4444' : 'hsl(var(--border))'};
              padding: 0.5rem;
            }
            .PhoneInputCountry {
              margin-right: 0.5rem;
            }
            .PhoneInputInput {
              flex: 1;
              border: none;
              outline: none;
              padding: 0.25rem;
              font-size: 1.125rem;
              line-height: 1.75rem;
            }
          `}</style>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.phoneButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
