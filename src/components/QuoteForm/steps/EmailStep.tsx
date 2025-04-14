
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormTranslations } from '../translations';
import { ArrowRight, Mail } from 'lucide-react';

interface EmailStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  initialValue: string;
  language: string;
}

export const EmailStep: React.FC<EmailStepProps> = ({ 
  onNext, 
  translation, 
  initialValue,
  language
}) => {
  const [email, setEmail] = useState(initialValue);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setError(translation.emailError);
      return;
    }
    onNext(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.emailTitle}</h2>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validateEmail(e.target.value)) setError('');
            }}
            placeholder={translation.emailPlaceholder}
            className={`h-12 text-lg pl-12 ${error ? 'border-red-500' : ''}`}
            autoComplete="email"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.emailButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
